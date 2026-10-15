---
title: "Flow Matching from Scratch: From the Continuity Equation to a Robot Action Expert"
slug: fr5-part-3-flow-matching
series: "Imitation Learning on a Fairino FR5"
part: 3
author: Sreevaatsav B
date: 2026-10-XX
tags: [flow-matching, generative-models, normalizing-flows, vla, robotics]
summary: "My study notes on flow matching, written up: how probability moves like a fluid, why older flow models were slow to train, how flow matching fixes that, a small comparison I ran on toy data, and how a robot policy uses it to produce actions."
---

# Flow Matching from Scratch: From the Continuity Equation to a Robot Action Expert

**Sreevaatsav B**

---

## Abstract

The π0 policy in [Part 2](./fr5-part-2-policies-and-results) doesn't predict actions directly. It starts with random noise and nudges it, step by step, until the noise becomes a chunk of robot actions. The method behind this is called flow matching [1]. I was fine-tuning π0 without really understanding this part, so between April and July 2026 I worked through it on paper, starting from basic fluid mechanics. This post is a cleaned-up version of those notes, plus a small experiment where I trained four related models on toy data to see the differences for myself. The figures with handwriting are taken from my notes, and the [full notes](https://drive.google.com/file/d/1DdxDHoI8O3pMmKbs-rLw_dxHNOTk3dWV/view?usp=sharing) are on Google Drive. None of this is new research; it's me learning how the thing I was using works.

---

## How I learned this

Most of this came from other people's explanations. The one that helped me most was Julia Turc's video [*The physics behind Flow Matching models*](https://www.youtube.com/watch?v=3mFNpeJQjmw) [7], one of the best explanations I've come across. I also read Peter Roelants' [*Flow Matching: A visual introduction*](https://peterroelants.github.io/posts/flow_matching_intro/) [8] and the Cambridge Machine Learning Group's [*An introduction to Flow Matching*](https://mlg.eng.cam.ac.uk/blog/2024/01/20/flow-matching.html) [9], along with other videos and posts on diffusion policies and flow matching. The handwritten notes in the figures are me working through these sources; the [full set of notes](https://drive.google.com/file/d/1DdxDHoI8O3pMmKbs-rLw_dxHNOTk3dWV/view?usp=sharing) (PDF) is on Google Drive.

---

## 1. Why generate actions at all

One way ACT failed in Part 2 was by averaging. If some demonstrations go around an obstacle on the left and some go around it on the right, a model trained to minimise squared error gets pulled toward the average of the two, and the average goes straight into the obstacle.

One fix is to learn the whole range of possible actions for a given observation and sample one of them, instead of predicting a single "best" action. Then left and right are both likely and the middle isn't. Diffusion models and flow matching are two ways to do this.

---

## 2. Probability as a fluid

A probability distribution can be described as a cloud of particles, dense where the probability is high. If every point in space has a velocity, an arrow for which way a particle there moves, that is a *velocity field*, written $v(x, t)$ because it can change with position $x$ and time $t$. As the particles move, the density changes, and the continuity equation describes how.

### 2.1 The continuity equation

My notes start with a tiny box with sides $\Delta x$, $\Delta y$, $\Delta z$, so its volume is $\Delta V$. If the density inside is $\rho$, the mass inside is $\rho\,\Delta V$, and it changes at the rate

$$
\frac{d(\text{mass})}{dt} = \Delta V\,\frac{\partial \rho}{\partial t}.
$$

Mass only changes by flowing through the six faces. The amount flowing through a face per second is density × speed across the face × face area. On the left face, at position $x$, mass flows in at $(\rho v_x)\big|_x\,\Delta y\,\Delta z$. On the right face, at $x + \Delta x$, it flows out at $(\rho v_x)\big|_{x+\Delta x}\,\Delta y\,\Delta z$. So the net gain from this pair of faces is

$$
\Big[(\rho v_x)\big|_x - (\rho v_x)\big|_{x+\Delta x}\Big]\Delta y\,\Delta z \;\approx\; -\frac{\partial (\rho v_x)}{\partial x}\,\Delta V.
$$

The top/bottom and front/back faces work the same way. Since mass isn't created or destroyed, the change inside the box must equal what flows in through all six faces:

$$
\Delta V\,\frac{\partial \rho}{\partial t} = -\left[\frac{\partial (\rho v_x)}{\partial x} + \frac{\partial (\rho v_y)}{\partial y} + \frac{\partial (\rho v_z)}{\partial z}\right]\Delta V.
$$

Cancelling $\Delta V$ and writing the bracket in shorthand as $\nabla\cdot(\rho v)$ (the *divergence*) gives the **continuity equation**:

$$
\boxed{\;\frac{\partial \rho}{\partial t} + \nabla\cdot(\rho\, v) = 0\;}
$$

![Control-volume derivation of the continuity equation, from my notes](figures/part3/p03-continuity-control-volume.jpg)
*Figure 1. Deriving the continuity equation from mass flowing through the faces of a small box (my notes, p. 3).*

The divergence $\nabla\cdot(\rho v)$ is "how much mass leaves a point per unit volume". If it's positive, mass spreads out from that point. If it's negative, mass gathers there. If it's zero, what comes in goes out.

![Sketches of positive, negative and zero divergence](figures/part3/p05-divergence-sketch.jpg)
*Figure 2. Positive, negative and zero divergence (p. 5).*

The same equation holds for probability in any number of dimensions. Later, when I say a velocity field "produces" a sequence of distributions, I mean the two satisfy this equation.

![Handwritten notes on the divergence theorem](figures/part3/p20-divergence-theorem.jpg)
![Handwritten derivation of the continuity equation in d dimensions](figures/part3/p21-continuity-d-dims.jpg)
*Figure 3. The continuity equation in $d$ dimensions from the divergence theorem, and its material-derivative form (pp. 20–21).*

### 2.2 Following the arrows

A particle starting at $x_0$ moves by following the arrows:

$$
\frac{dx}{dt} = v(x, t), \qquad x(0) = x_0.
$$

This is an ordinary differential equation (ODE). For a smooth velocity field, like one a neural network produces, every starting point has exactly one path, and paths from different starting points never cross.

With a neural network as the velocity field, this can't be solved exactly, so it's solved in small steps. Euler's method assumes the velocity stays the same for a short time $h$:

$$
x(t + h) \approx x(t) + h\, v(x(t), t).
$$

Smaller steps are more accurate but need more network calls. That trade-off matters a lot when a robot needs a new action every 33 ms.

![Handwritten notes on ODE trajectories and Euler's method](figures/part3/p09-ode-trajectories.jpg)
![Handwritten notes on Euler step size and error](figures/part3/p10-euler-step-size.jpg)
*Figure 4. ODEs: one trajectory from each starting point when the velocity field is Lipschitz, Euler's method, and how its error depends on the step size (pp. 9–10).*

### 2.3 Watching the density along a path

Following one particle, the density around it changes as it moves. Rearranging the continuity equation (product rule, then dividing by the density) gives:

$$
\frac{d}{dt}\log p\big(x(t), t\big) = -\nabla\cdot v\big(x(t), t\big).
$$

In words: along a particle's path, the log-density goes down wherever the arrows spread out and up wherever they squeeze together. This is what older flow models use to compute likelihoods, and it's also why they are slow, as the next section shows.

![Handwritten notes deriving the material derivative](figures/part3/p17-material-derivative.jpg)
![Handwritten notes on the log-density along a particle path](figures/part3/p37-log-density-along-path.jpg)
*Figure 5. The material derivative, which follows a quantity along a moving particle, and the instantaneous change of variables it leads to, with the steps a CNF takes to compute a likelihood (pp. 17, 37).*

---

## 3. The older approach: normalizing flows

The goal of a generative model is to turn simple noise into realistic data. A normalizing flow does this with a function $f$ that can be run backwards. Noise $z$ is sampled from a standard Gaussian, and the output is $x = f(z)$.

Because $f$ is invertible, the exact likelihood of any data point can also be computed, using the change-of-variables formula:

$$
p(x) = p_{\text{noise}}\big(f^{-1}(x)\big)\,\big|\det J_{f^{-1}}(x)\big|.
$$

![Handwritten notes on the change of variables in one dimension](figures/part3/p13-change-of-variables-1d.jpg)
![Handwritten notes on the Jacobian determinant](figures/part3/p14-jacobian.jpg)
*Figure 6. The change-of-variables formula in one dimension, where the probability in a thin strip is conserved, and in many dimensions with the Jacobian determinant (pp. 13–14).*

The determinant term measures how much $f$ stretches or squeezes space. For example, if noise is uniform on $[0, 1]$ and $f(z) = 2z$, the output is uniform on $[0, 2]$ with density $1/2$, because $f$ stretches everything by 2. The model is trained by maximising the likelihood of the training data.

![Handwritten pushforward example with a uniform density](figures/part3/p26-pushforward-example.jpg)
*Figure 7. The pushforward density, with $\phi(x) = 2x$ worked through on a uniform density (p. 26).*

The expensive part is computing that determinant. For a general $d \times d$ matrix it costs about $d^3$ operations, at every training step. Real NVP [2] gets around this with *coupling layers*, which split the input in half, leave one half alone, and scale and shift the other half using amounts computed from the first half. The determinant then becomes a simple sum, which is cheap. But each layer only changes half the numbers, and every layer has to follow this special structure, which limits what the model can do.

![Handwritten notes on Real NVP coupling layers](figures/part3/p32-coupling-layer.jpg)
![Handwritten notes on the coupling layer log-determinant](figures/part3/p33-coupling-log-det.jpg)
*Figure 8. Real NVP coupling layers: why the Jacobian is triangular, and why the log-determinant is a sum of the scale outputs (pp. 32–33).*

**Continuous normalizing flows** (CNFs) [3] drop that restriction. Instead of stacking special layers, they use a velocity field and the ODE from Section 2.2, and the network can be anything. The likelihood comes from the log-density formula in Section 2.3. The cost is that the divergence term $\nabla\cdot v$ is expensive to compute for a neural network, and training means simulating the whole ODE, forwards and backwards, for every training example. In my experiment (Section 5), a CNF training step on MNIST took about 1 second, compared with about 60 ms for flow matching using the same network.

![Handwritten notes on continuous normalizing flows](figures/part3/p35-continuous-flows.jpg)
![Handwritten notes on the cost of training a CNF](figures/part3/p38-cnf-cost.jpg)
*Figure 9. From discrete layers to continuous normalizing flows, and why CNF training is slow: the divergence needs the trace of a Jacobian, estimated with the Hutchinson trick (pp. 35, 38).*

Flow matching keeps the flexible velocity field but trains it in a much cheaper way.

---

## 4. Flow matching

### 4.1 The idea

If we had a velocity field $u_t(x)$ that moves the noise distribution into the data distribution, we could train the network to copy it at random points and times:

$$
\mathcal{L}_{\text{FM}} = \mathbb{E}_{t,\,x}\,\big\|v_\theta(x, t) - u_t(x)\big\|^2.
$$

But $u_t$ isn't available. We only have samples of noise and samples of data, and there are many ways to move one into the other.

### 4.2 One data point at a time

The idea in Lipman et al. [1] is to solve the problem for a single data point first. With one data point $x_1$ and one noise sample $x_0$, the most direct path between them is a straight line:

$$
x_t = (1-t)\,x_0 + t\,x_1, \qquad t \in [0, 1].
$$

At $t = 0$ the point is at the noise sample, and at $t = 1$ it's at the data point. The velocity along this line is constant:

$$
\frac{d x_t}{dt} = x_1 - x_0.
$$

This is the *conditional* velocity: the velocity when the target data point is known. Doing this for every possible pair and averaging over all of them gives a path from the whole noise distribution to the whole data distribution.

![Handwritten sketch of a straight-line path from a noise sample to a data point](figures/part3/p66-straight-line-path.jpg)
*Figure 10. Conditional flow matching: a straight-line path from a noise sample to a data point, with constant velocity $x_1 - x_0$ (p. 66).*

### 4.3 What the overall velocity should be

At any point $x$ and time $t$, many of these straight lines pass through. Each is heading to a different data point, with a different velocity. The overall (*marginal*) velocity there is the average of those conditional velocities, weighted by how likely each data point is given the current point $x$:

$$
u_t(x) = \mathbb{E}\big[\,x_1 - x_0 \;\big|\; x_t = x\,\big].
$$

![Handwritten statement of the marginal velocity](figures/part3/p49-marginal-velocity.jpg)
![Handwritten proof that the marginal velocity satisfies the continuity equation](figures/part3/p50-marginal-velocity-proof.jpg)
*Figure 11. The marginal velocity, and the proof that it satisfies the continuity equation for the marginal path (pp. 49–50).*

Plugging this into the continuity equation confirms that it moves the noise distribution into the data distribution. The derivation is a few lines: write the continuity equation for one data point, average over all data points, and move the derivatives outside the average. It's on pp. 49–51 of my notes.

![Marginal velocity as a weighted average of conditional velocities](figures/part3/p51-marginal-velocity-weighted-average.jpg)
*Figure 12. The overall velocity at a point is a weighted average of the velocities toward each data point (p. 51).*

### 4.4 The loss we actually train

That weighted average can't be computed directly; it would need the whole dataset at every point. It isn't needed, though: the network can be trained on the per-pair target instead:

$$
\mathcal{L}_{\text{CFM}} = \mathbb{E}_{t,\,x_0,\,x_1}\,\Big\|v_\theta(x_t, t) - (x_1 - x_0)\Big\|^2.
$$

This is called conditional flow matching, and it has the same gradients as the loss in Section 4.1 [1]. The reason is a basic property of regression: a model trained with squared error learns the *average* of its targets for a given input. Different pairs pass through the same point with different velocities, and the network can only output one value there, so it learns their average, which is exactly $u_t(x)$.

![Different pairs' straight paths crossing at one point](figures/part3/p67-crossing-paths.jpg)
*Figure 13. Different noise–data pairs pass through the same point at the same time, heading different ways. The network can only output one velocity there, so it learns their average (p. 67).*

![Network fitting the mean of scattered velocity targets](figures/part3/p69-regression-to-mean.jpg)
*Figure 14. Individual targets are scattered; the trained network goes through their mean (p. 69).*

### 4.5 Training and sampling

Training is four lines per batch:

1. sample a data point $x_1$ and a noise sample $x_0$,
2. sample a time $t$ between 0 and 1,
3. compute the point on the line, $x_t = (1-t)x_0 + t\,x_1$,
4. train $v_\theta(x_t, t)$ to output $x_1 - x_0$.

There's no ODE to simulate and no determinant or divergence to compute. Sampling starts from noise and takes Euler steps:

```python
def flow_sample(v_net, n, shape, n_steps=10):
    x = torch.randn(n, *shape)          # start from noise
    h = 1.0 / n_steps
    for k in range(n_steps):
        t = torch.full((n,), k / n_steps)
        x = x + h * v_net(x, t)         # one Euler step
    return x
```

![Euler steps following the path from noise to sample](figures/part3/p74-euler-sampling.jpg)
*Figure 15. Euler steps approximating the path from noise to a sample (p. 74).*

### 4.6 Making the paths straighter

The individual lines are straight, but because noise and data are paired at random, they cross each other. Averaging crossing lines makes the overall paths curve, and curved paths need more Euler steps. Rectified flow [4] addresses this by generating samples with the trained model, keeping each noise sample paired with the output the model actually produced, and retraining on those pairs. The new pairs cross much less, so the paths are straighter and a few steps are enough.

---

## 5. Trying it on toy data

To see these differences for myself, I trained all four models on two datasets: *two moons* (a 2-D toy dataset shaped like two interlocking crescents) and MNIST (28×28 handwritten digits). CNF, flow matching and rectified flow used the same velocity network on each dataset (a small MLP for moons and a U-Net for MNIST), so the main difference was the training recipe. Real NVP can't use a free-form network, so it has its own coupling-layer architecture. Everything ran on my MacBook (Apple M3 Pro GPU).

| method | dataset | ms per training step | peak memory (MiB) | total training (s) | network calls per sample | ms per sample |
|---|---|---|---|---|---|---|
| Real NVP | moons | 15.6 | 41 | 52 | 8 | < 0.01 |
| Real NVP | MNIST | 72.2 | 747 | 201 | 16 | 0.22 |
| CNF | moons | 33.8 | 91 | 31 | 50 | 0.01 |
| CNF | MNIST | 1,067 | 5,317 | 397 | 30 | 6.5 |
| flow matching | moons | 1.6 | 25 | 6 | 50 | 0.01 |
| flow matching | MNIST | 61.1 | 1,130 | 199 | 50 | 11.6 |
| rectified flow | MNIST | 63.7 | 1,147 | 136 | 4 | 3.1 |

![Training time per step for the four methods](figures/part3/exp-train-time-per-step.jpg)
*Figure 16. Median time per training step (log scale). With the same U-Net on MNIST, a CNF step took about 17× longer than a flow matching step.*

A few things stood out:

- **Training cost.** With the same U-Net on MNIST, flow matching ran a training step in about 61 ms against about 1,070 ms for the CNF, and used about a fifth of the memory. That gap is exactly the ODE simulation and divergence computation that flow matching removes. Because CNF training was so slow, I only gave it 300 steps on MNIST against 3,000 for flow matching, so its sample quality isn't a fair comparison. The time per step is.
- **Number of steps matters.** On moons, 4 Euler steps gave a smeared shape and 20 to 100 steps recovered the two crescents. On MNIST, digits became clean at around 20 to 50 steps.
- **Rectified flow makes sampling cheaper.** After one round of re-pairing, rectified flow produced readable digits in 4 steps (3.1 ms per image), where plain flow matching at 1 to 2 steps gave blurry blobs.
- **Real NVP samples fastest.** It needs only one pass through its layers, so it's by far the cheapest to sample from. Its MNIST digits were noticeably noisier, though, since it can't use a U-Net.

![Flow matching on moons with 4, 20 and 100 Euler steps](figures/part3/exp-moons-euler-steps.jpg)
*Figure 17. Flow matching samples (orange) against the data (blue) on two moons, with 4, 20 and 100 Euler steps.*

![Flow matching MNIST samples at 4, 20 and 50 Euler steps](figures/part3/exp-mnist-euler-steps.jpg)
*Figure 18. Flow matching MNIST samples at 4, 20 and 50 Euler steps.*

![Plain flow matching vs rectified flow at 1, 2, 4 and 10 steps](figures/part3/exp-fm-vs-rectified-mnist.jpg)
*Figure 19. Plain flow matching (top) vs rectified flow (bottom) at 1, 2, 4 and 10 Euler steps.*

These are small, quick experiments: one run each, short training, and timings on a laptop GPU. They're useful for seeing the trade-offs, not as benchmark numbers. The notebooks are in my [flow-matching repository](https://github.com/SreevaatsavB/flow-matching). <!-- TODO(Vaatsav): confirm or fix this repo link, and push the notebooks if they aren't public yet. -->

---

## 6. From digits to robot actions

A robot policy uses the same recipe with three changes.

**The data point is a chunk of actions.** Instead of an image, $x_1$ is the next $H$ actions: $A_1 = [a_t, a_{t+1}, \dots, a_{t+H-1}]$, a grid of $H$ rows and $d_a$ columns. For our robot $d_a = 7$ (six joints and the gripper). The noise $A_0$ has the same shape, and the straight line $A_\tau = (1-\tau)A_0 + \tau A_1$ is applied to every number in the grid. I use $\tau$ for the flow time here so it doesn't get confused with the robot's time step $t$.

![Handwritten notes on setting up flow matching for a robot policy](figures/part3/p75-robot-policy-setup.jpg)
*Figure 20. Flow matching for a robot policy: the data point becomes a chunk of future actions, and the velocity network gets a conditioning input (p. 75).*

A one-joint example made this click for me. The demonstrated joint angle is 30° and the noise sample is −5°, so the target velocity is $30 - (-5) = 35°$. At $\tau = 0.5$, the network sees the in-between angle 12.5° along with $\tau = 0.5$, and is trained to output 35. (A diffusion model would instead be trained to output the noise, −5.)

![Handwritten single-joint example with a 30 degree target](figures/part3/p64-single-joint-example.jpg)
![Handwritten comparison of diffusion and flow matching targets](figures/part3/p65-diffusion-vs-flow-target.jpg)
*Figure 21. The single-joint example: a 30° demonstration and a −5° noise sample, and the training target under diffusion (the noise) versus flow matching (the velocity, 35°) (pp. 64–65).*

**Everything depends on what the robot sees.** The network becomes $v_\theta(A_\tau, \tau, c)$, where $c$ includes the robot's current joint angles and gripper state, plus the camera images and instruction as encoded by the vision-language model. In my notes I also included a short window of past actions; π0 itself doesn't use one.

![Handwritten notes on the conditioning variable for a VLA](figures/part3/p76-conditioning.jpg)
![Handwritten diagram of the policy inputs feeding the action expert](figures/part3/p77-policy-inputs.jpg)
*Figure 22. The conditioning for a VLA: robot state, past actions and the vision-language encoding, and how each one reaches the action expert (pp. 76–77).*

**Generating a chunk is a short ODE solve.** Ten Euler steps means ten passes through the action network per chunk. The images and instruction only need to be encoded once per chunk.

The chunk length $H$ is a trade-off. A longer chunk means calling the big model less often, but the predictions have to stay accurate further into the future. This connects to Part 2, where a chunk of 50 actions made the first action hard to get right and a chunk of 10 worked much better.

![Handwritten notes on chunk length and classifier-free guidance](figures/part3/p78-chunk-length-cfg.jpg)
*Figure 23. Two hyperparameters, the chunk length $H$ and the past-action window $K$, and the start of my notes on classifier-free guidance (p. 78).*

### 6.1 Telling the network what time it is

The network needs to know $\tau$. Near $\tau = 0$ the input is almost pure noise, so it should make big corrections; near $\tau = 1$ the input is nearly a clean action, so it should make small ones. Passing $\tau$ as a single number doesn't work well, because one number among hundreds of features is easy for the network to ignore.

Instead, $\tau$ is turned into a vector of sines and cosines at different frequencies, the same approach transformers use for word positions:

$$
\text{embed}(\tau) = \big[\sin(\tau\omega_1), \cos(\tau\omega_1), \sin(\tau\omega_2), \cos(\tau\omega_2), \dots\big], \qquad \omega_i = \frac{1}{10000^{2i/d}}.
$$

The high-frequency entries change quickly as $\tau$ changes and the low-frequency ones change slowly, so together they tell the network both roughly and precisely where it is on the path.

![Handwritten notes on sinusoidal time embeddings](figures/part3/p70-sinusoidal-embedding.jpg)
![Handwritten notes on concatenation, FiLM and AdaLN](figures/part3/p71-injecting-time.jpg)
*Figure 24. Why feeding $\tau$ in as a single number works poorly, sinusoidal time embeddings, and three ways to inject them: concatenation, FiLM and AdaLN (pp. 70–71).*

This vector is then used to adjust each transformer block. A common way is AdaLN (adaptive layer norm): a small network turns the time embedding into a scale $\gamma$, a shift $\beta$ and a gate $\alpha$, and each block's normalised hidden state is adjusted as

$$
h' = \alpha \cdot \big(\gamma \cdot \text{LN}(h) + \beta\big).
$$

A small worked example from my notes uses an 8-number embedding and a toy hidden state of size 2. For $\tau = 0.3$, the frequencies are $[1, 0.1, 0.01, 0.001]$, so

$$
\text{embed}(0.3) \approx [0.30,\ 0.96,\ 0.03,\ 1.00,\ 0.003,\ 1.00,\ 0.0003,\ 1.00].
$$

In the example, the small network turns this into $\gamma = [1.3, 1.96]$ and $\beta = [0.03, 0.00]$, and the normalised hidden state is $\text{LN}(h) = [1, -1]$. Then $\gamma \cdot \text{LN}(h) + \beta = [1.33, -1.96]$. At the start of training the gate is $\alpha = [0, 0]$, so the block initially changes nothing ("AdaLN-zero"). As training goes on, the gate opens; with $\alpha = [0.5, 0.5]$ the output becomes $[0.665, -0.98]$. The same time embedding is computed once and reused by every block.

![Handwritten AdaLN worked example](figures/part3/p72-adaln-worked-example.jpg)
*Figure 25. The AdaLN worked example for $\tau = 0.3$, step by step (p. 72).*

### 6.2 Which training times to practise on

By default, training picks $\tau$ uniformly between 0 and 1. But the noisy end, near $\tau = 0$, is the hardest: the input is almost pure noise, and many different action chunks are consistent with it. It's also where sampling starts, so mistakes in the first few Euler steps carry through to all the later ones.

π0 deals with this by drawing training times from a Beta distribution shaped to put more samples near the noisy end [5]. At inference, the steps are still evenly spaced. In my notes I also noticed that, during training, the validation loss measured at uniformly sampled times tends to sit above the one measured at Beta-sampled times.

![Beta-distributed training times concentrated near tau = 0](figures/part3/p81-beta-time-sampling.jpg)
*Figure 26. Drawing training times from a Beta distribution concentrated near the noisy end (p. 81).*

One thing that confused me when I first read the π0 code: openpi and LeRobot flip the time direction. Noise is at $\tau = 1$ and data at $\tau = 0$, and sampling runs from 1 down to 0. It's the same method, but reading the paper and the code side by side, I found it easy to get a sign wrong.

### 6.3 Classifier-free guidance

My notes also cover classifier-free guidance [6], which is common in image models and some robot policies, though π0 doesn't use it. During training, the conditioning $c$ is randomly blanked out some of the time, so the network learns to predict both with and without it. At inference both are run, and the result is pushed further in the direction the conditioning points:

$$
v_{\text{guided}} = v_\theta(A_\tau, \tau, \varnothing) + w\,\big(v_\theta(A_\tau, \tau, c) - v_\theta(A_\tau, \tau, \varnothing)\big).
$$

With $w = 1$ this is the ordinary model, and $w > 1$ exaggerates the effect of the conditioning. It costs two network calls per step.

![Handwritten notes on training with classifier-free guidance](figures/part3/p79-cfg-training.jpg)
![Handwritten notes on classifier-free guidance at inference](figures/part3/p80-cfg-inference.jpg)
*Figure 27. Classifier-free guidance: conditioned and unconditioned velocities, the guided velocity at inference, and how the weight $w$ moves the samples (pp. 79–80).*

### 6.4 The action expert

In π0-style models, the velocity comes from an **action expert**: a smaller transformer that sits alongside the vision-language model. Its inputs are the vision-language tokens, a token for the robot's state, and $H$ tokens for the noisy action chunk. The outputs at the action positions go through a final linear layer to give one velocity per action entry. Every block is adjusted by the same time embedding.

![Stack of action-expert blocks modulated by the same tau embedding](figures/part3/p85-action-expert-stack.jpg)
*Figure 28. The action expert: attention and MLP blocks, each adjusted by the same time embedding, then a linear output layer (p. 85).*

All these tokens are in one sequence, but they shouldn't all see each other. The model's understanding of the scene shouldn't depend on the half-generated noisy actions, since that would only add noise. The noisy action tokens, on the other hand, need to see everything. This gives a **block-causal attention mask**: the vision-language tokens only look at each other, the state token looks at the vision-language tokens and itself, and the action tokens look at everything.

![Block-causal attention mask](figures/part3/p84-block-causal-mask.jpg)
*Figure 29. The block-causal mask. Rows are the tokens doing the looking and columns are the tokens being looked at; shaded cells are allowed (p. 84).*

### 6.5 In our robot code

Our DiT policy in `policies/dit_flow/model.py` uses the straight-line path from Section 4, with 10 Euler steps at inference. The π0 runs in Part 2 used LeRobot's implementation, with the flipped time direction from Section 6.2 and 10 integration steps.

---

## 7. Summary

Thinking of probability as a fluid gives the continuity equation, and most of this post follows from it. Older flow models used it to compute exact likelihoods, but that made training slow. Flow matching keeps the idea of a velocity field and trains it with plain regression: pick a noise sample and a data point, draw a straight line, and teach the network the line's velocity. It works because a regression model learns the average of its targets, and that average is the velocity we actually want. In my small experiment this made training more than an order of magnitude faster than a CNF with the same network, and rectified flow cut sampling down to a few steps. For robot policies, the extra pieces are mostly practical: predicting action chunks, telling the network what time it is, choosing which times to train on, and controlling which tokens can see each other.

---

## A note on AI tools

I used Claude to help write some of the text in this post.

---

## References

[1] Y. Lipman, R. T. Q. Chen, H. Ben-Hamu, M. Nickel, M. Le. *Flow Matching for Generative Modeling*. ICLR 2023. arXiv:2210.02747

[2] L. Dinh, J. Sohl-Dickstein, S. Bengio. *Density Estimation using Real NVP*. ICLR 2017. arXiv:1605.08803

[3] R. T. Q. Chen, Y. Rubanova, J. Bettencourt, D. Duvenaud. *Neural Ordinary Differential Equations*. NeurIPS 2018. arXiv:1806.07366

[4] X. Liu, C. Gong, Q. Liu. *Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow*. ICLR 2023. arXiv:2209.03003

[5] K. Black et al. *π0: A Vision-Language-Action Flow Model for General Robot Control*. arXiv:2410.24164, 2024.

[6] J. Ho, T. Salimans. *Classifier-Free Diffusion Guidance*. NeurIPS 2021 Workshop. arXiv:2207.12598

[7] J. Turc. *The physics behind Flow Matching models*. YouTube. https://www.youtube.com/watch?v=3mFNpeJQjmw

[8] P. Roelants. *Flow Matching: A visual introduction*. 2025. https://peterroelants.github.io/posts/flow_matching_intro/

[9] T. Fjelde, E. Mathieu, V. Dutordoir. *An introduction to Flow Matching*. Cambridge MLG Blog, 2024. https://mlg.eng.cam.ac.uk/blog/2024/01/20/flow-matching.html

**Code:** [fairino-fr5-policies](https://github.com/SreevaatsavB/fairino-fr5-policies) · [robotic-ml-from-scratch](https://github.com/SreevaatsavB/robotic-ml-from-scratch)

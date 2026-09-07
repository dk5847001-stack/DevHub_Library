import { useEffect, useRef } from "react";

export default function KineticGrid() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        let animationId;
        let running = true;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        let W = 0;
        let H = 0;

        // -----------------------------
        // PARAMETERS
        // -----------------------------

        const IMPULSE_RATE = 0.7;
        const SPRING_TENSION = 1.0;
        const IMPULSE_STRENGTH = 1.0;

        const COLS = 40;
        const ROWS = 25;

        let DAMPING = 0.978;
        const RETURN_FORCE = 0.003;
        const SPRING_K_BASE = 0.12;

        // -----------------------------
        // NODE STORAGE
        // -----------------------------

        const nodeCount = COLS * ROWS;

        const posX = new Float32Array(nodeCount);
        const posY = new Float32Array(nodeCount);

        const velX = new Float32Array(nodeCount);
        const velY = new Float32Array(nodeCount);

        const restX = new Float32Array(nodeCount);
        const restY = new Float32Array(nodeCount);

        // -----------------------------
        // SPRINGS
        // -----------------------------

        let springs = [];

        // -----------------------------
        // FLASHES
        // -----------------------------

        const flashes = [];

        // -----------------------------
        // TIMING
        // -----------------------------

        let lastTime = 0;
        let timeSinceImpulse = 0;

        let impulseInterval = 1 / IMPULSE_RATE;

        // -----------------------------
        // GRID
        // -----------------------------

        let spacingX = 0;
        let spacingY = 0;

        let marginX = 0;
        let marginY = 0;

        const idx = (col, row) => {
            return row * COLS + col;
        };

        const buildGrid = () => {
            marginX = W * 0.06;
            marginY = H * 0.06;

            spacingX = (W - marginX * 2) / (COLS - 1);
            spacingY = (H - marginY * 2) / (ROWS - 1);

            // Nodes
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    const i = idx(c, r);

                    const x = marginX + c * spacingX;
                    const y = marginY + r * spacingY;

                    restX[i] = x;
                    restY[i] = y;

                    posX[i] = x;
                    posY[i] = y;

                    velX[i] = 0;
                    velY[i] = 0;
                }
            }

            // Springs
            springs = [];

            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    const i = idx(c, r);

                    // Right
                    if (c < COLS - 1) {
                        const j = idx(c + 1, r);

                        springs.push(
                            i,
                            j,
                            spacingX
                        );
                    }

                    // Bottom
                    if (r < ROWS - 1) {
                        const j = idx(c, r + 1);

                        springs.push(
                            i,
                            j,
                            spacingY
                        );
                    }
                }
            }
        };

        // -----------------------------
        // RESIZE
        // -----------------------------

        const resize = () => {
            dpr = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            W = window.innerWidth;
            H = window.innerHeight;

            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);

            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

            buildGrid();
        };

        // -----------------------------
        // MOUSE IMPULSE
        // -----------------------------

        let mouseDown = false;

        const injectMouseImpulse = (mx, my) => {
            const strength = 18 * IMPULSE_STRENGTH;
            const radius = 4;

            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {

                    const i = idx(c, r);

                    const dx = restX[i] - mx;
                    const dy = restY[i] - my;

                    const dist = Math.sqrt(
                        dx * dx + dy * dy
                    );

                    const maxDistance =
                        radius * Math.max(
                            spacingX,
                            spacingY
                        );

                    if (
                        dist < maxDistance &&
                        dist > 0.1
                    ) {
                        let falloff =
                            1 - dist / maxDistance;

                        falloff *= falloff;

                        velX[i] +=
                            (dx / dist) *
                            strength *
                            falloff;

                        velY[i] +=
                            (dy / dist) *
                            strength *
                            falloff;
                    }
                }
            }

            flashes.push({
                x: mx,
                y: my,
                life: 1,
                ring: 1
            });
        };

        const handleMouseDown = (e) => {
            mouseDown = true;

            injectMouseImpulse(
                e.clientX,
                e.clientY
            );
        };

        const handleMouseMove = (e) => {
            if (mouseDown) {
                injectMouseImpulse(
                    e.clientX,
                    e.clientY
                );
            }
        };

        const handleMouseUp = () => {
            mouseDown = false;
        };

        // -----------------------------
        // TOUCH
        // -----------------------------

        const handleTouchStart = (e) => {
            e.preventDefault();

            mouseDown = true;

            injectMouseImpulse(
                e.touches[0].clientX,
                e.touches[0].clientY
            );
        };

        const handleTouchMove = (e) => {
            e.preventDefault();

            if (mouseDown) {
                injectMouseImpulse(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                );
            }
        };

        const handleTouchEnd = () => {
            mouseDown = false;
        };

        // -----------------------------
        // RANDOM IMPULSE
        // -----------------------------

        const injectSingleImpulse = (
            edge,
            strength
        ) => {

            const regionSize =
                4 + Math.floor(
                    Math.random() * 6
                );

            let startNode;
            let flashX;
            let flashY;

            if (edge === 0) {

                startNode = Math.floor(
                    Math.random() *
                    Math.max(
                        1,
                        COLS - regionSize
                    )
                );

                flashX =
                    marginX +
                    (startNode +
                        regionSize * 0.5) *
                        spacingX;

                flashY = marginY;

                for (
                    let c = startNode;
                    c < startNode + regionSize &&
                    c < COLS;
                    c++
                ) {
                    const i = idx(c, 0);

                    const falloff =
                        1 -
                        Math.abs(
                            c -
                            startNode -
                            regionSize * 0.5
                        ) /
                        (regionSize * 0.5);

                    velY[i] +=
                        strength *
                        falloff *
                        falloff;
                }

            } else if (edge === 1) {

                startNode = Math.floor(
                    Math.random() *
                    Math.max(
                        1,
                        ROWS - regionSize
                    )
                );

                flashX =
                    marginX +
                    (COLS - 1) *
                    spacingX;

                flashY =
                    marginY +
                    (startNode +
                        regionSize * 0.5) *
                        spacingY;

                for (
                    let r = startNode;
                    r < startNode + regionSize &&
                    r < ROWS;
                    r++
                ) {
                    const i = idx(
                        COLS - 1,
                        r
                    );

                    const falloff =
                        1 -
                        Math.abs(
                            r -
                            startNode -
                            regionSize * 0.5
                        ) /
                        (regionSize * 0.5);

                    velX[i] -=
                        strength *
                        falloff *
                        falloff;
                }

            } else if (edge === 2) {

                startNode = Math.floor(
                    Math.random() *
                    Math.max(
                        1,
                        COLS - regionSize
                    )
                );

                flashX =
                    marginX +
                    (startNode +
                        regionSize * 0.5) *
                        spacingX;

                flashY =
                    marginY +
                    (ROWS - 1) *
                    spacingY;

                for (
                    let c = startNode;
                    c < startNode + regionSize &&
                    c < COLS;
                    c++
                ) {
                    const i = idx(
                        c,
                        ROWS - 1
                    );

                    const falloff =
                        1 -
                        Math.abs(
                            c -
                            startNode -
                            regionSize * 0.5
                        ) /
                        (regionSize * 0.5);

                    velY[i] -=
                        strength *
                        falloff *
                        falloff;
                }

            } else {

                startNode = Math.floor(
                    Math.random() *
                    Math.max(
                        1,
                        ROWS - regionSize
                    )
                );

                flashX = marginX;

                flashY =
                    marginY +
                    (startNode +
                        regionSize * 0.5) *
                        spacingY;

                for (
                    let r = startNode;
                    r < startNode + regionSize &&
                    r < ROWS;
                    r++
                ) {
                    const i = idx(0, r);

                    const falloff =
                        1 -
                        Math.abs(
                            r -
                            startNode -
                            regionSize * 0.5
                        ) /
                        (regionSize * 0.5);

                    velX[i] +=
                        strength *
                        falloff *
                        falloff;
                }
            }

            flashes.push({
                x: flashX,
                y: flashY,
                life: 1,
                ring: 1
            });
        };

        const injectImpulse = () => {

            const baseStrength =
                (22 + Math.random() * 14) *
                IMPULSE_STRENGTH;

            const edge =
                Math.floor(
                    Math.random() * 4
                );

            injectSingleImpulse(
                edge,
                baseStrength
            );
        };

        // -----------------------------
        // PHYSICS
        // -----------------------------

        const simulate = () => {

            if (prefersReduced) return;

            const springK =
                SPRING_K_BASE *
                SPRING_TENSION;

            const springCount =
                springs.length / 3;

            // Springs
            for (
                let s = 0;
                s < springCount;
                s++
            ) {

                const s3 = s * 3;

                const a = springs[s3];
                const b = springs[s3 + 1];

                const restLen =
                    springs[s3 + 2];

                const dx =
                    posX[b] - posX[a];

                const dy =
                    posY[b] - posY[a];

                const dist =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (dist < 0.001) continue;

                const stretch =
                    dist - restLen;

                const force =
                    springK *
                    stretch /
                    dist;

                const fx =
                    dx * force;

                const fy =
                    dy * force;

                velX[a] += fx;
                velY[a] += fy;

                velX[b] -= fx;
                velY[b] -= fy;
            }

            // Update nodes
            for (
                let i = 0;
                i < nodeCount;
                i++
            ) {

                velX[i] +=
                    (restX[i] - posX[i]) *
                    RETURN_FORCE;

                velY[i] +=
                    (restY[i] - posY[i]) *
                    RETURN_FORCE;

                velX[i] *= DAMPING;
                velY[i] *= DAMPING;

                posX[i] += velX[i];
                posY[i] += velY[i];
            }
        };

        // -----------------------------
        // COLOR
        // -----------------------------

        const tensionColor = (tension) => {

            const t = Math.max(
                0,
                Math.min(1, tension)
            );

            let r;
            let g;
            let b;
            let a;

            if (t < 0.1) {

                const f = t / 0.1;

                r = 40 + f * 20;
                g = 14 + f * 8;
                b = 5 + f * 3;
                a = 0.25 + f * 0.1;

            } else if (t < 0.3) {

                const f =
                    (t - 0.1) / 0.2;

                r = 60 + f * 120;
                g = 22 + f * 38;
                b = 8 + f * 8;
                a = 0.35 + f * 0.2;

            } else if (t < 0.55) {

                const f =
                    (t - 0.3) / 0.25;

                r = 180 + f * 50;
                g = 60 + f * 60;
                b = 16 + f * 14;
                a = 0.55 + f * 0.2;

            } else if (t < 0.8) {

                const f =
                    (t - 0.55) / 0.25;

                r = 230 + f * 25;
                g = 120 + f * 100;
                b = 30 + f * 90;
                a = 0.75 + f * 0.15;

            } else {

                const f =
                    (t - 0.8) / 0.2;

                r = 255;
                g = 220 + f * 35;
                b = 120 + f * 120;
                a = 0.9 + f * 0.1;
            }

            return {
                r: Math.round(r),
                g: Math.round(g),
                b: Math.round(b),
                a
            };
        };

        // -----------------------------
        // RENDER
        // -----------------------------

        const render = (now) => {

            if (!running) return;

            const time =
                now * 0.001;

            let dt =
                lastTime === 0
                    ? 0.016
                    : time - lastTime;

            if (dt > 0.1) {
                dt = 0.016;
            }

            lastTime = time;

            // Impulse
            timeSinceImpulse += dt;

            impulseInterval =
                1.8 /
                IMPULSE_RATE;

            if (
                timeSinceImpulse >=
                impulseInterval
            ) {

                injectImpulse();

                timeSinceImpulse -=
                    impulseInterval;

                timeSinceImpulse -=
                    Math.random() *
                    impulseInterval *
                    0.3;
            }

            // Physics
            simulate();

            // Background
            ctx.globalCompositeOperation =
                "source-over";

            ctx.fillStyle =
                "rgba(10, 8, 6, 0.35)";

            ctx.fillRect(
                0,
                0,
                W,
                H
            );

            // Grid
            const avgSpacing =
                (spacingX + spacingY) *
                0.5;

            const tensionScale =
                1 /
                (avgSpacing * 0.35);

            const breathe =
                0.85 +
                0.15 *
                Math.sin(
                    time * 0.8
                );

            ctx.globalCompositeOperation =
                "lighter";

            ctx.lineCap = "round";

            const springCount =
                springs.length / 3;

            // -------------------------
            // GLOW
            // -------------------------

            for (
                let s = 0;
                s < springCount;
                s++
            ) {

                const s3 = s * 3;

                const a = springs[s3];
                const b = springs[s3 + 1];

                const restLen =
                    springs[s3 + 2];

                const ax = posX[a];
                const ay = posY[a];

                const bx = posX[b];
                const by = posY[b];

                const dx = bx - ax;
                const dy = by - ay;

                const dist =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                const stretch =
                    Math.abs(
                        dist - restLen
                    );

                const tension =
                    stretch *
                    tensionScale;

                const col =
                    tensionColor(tension);

                const baseGlowAlpha =
                    (0.04 +
                        tension * 0.18) *
                    breathe;

                ctx.beginPath();

                ctx.moveTo(ax, ay);
                ctx.lineTo(bx, by);

                ctx.strokeStyle =
                    `rgba(
                        ${col.r},
                        ${col.g},
                        ${col.b},
                        ${baseGlowAlpha.toFixed(4)}
                    )`;

                ctx.lineWidth =
                    3.5 +
                    tension * 8;

                ctx.stroke();
            }

            // -------------------------
            // CORE LINES
            // -------------------------

            for (
                let s = 0;
                s < springCount;
                s++
            ) {

                const s3 = s * 3;

                const a = springs[s3];
                const b = springs[s3 + 1];

                const restLen =
                    springs[s3 + 2];

                const ax = posX[a];
                const ay = posY[a];

                const bx = posX[b];
                const by = posY[b];

                const dx = bx - ax;
                const dy = by - ay;

                const dist =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                const stretch =
                    Math.abs(
                        dist - restLen
                    );

                const tension =
                    stretch *
                    tensionScale;

                const col =
                    tensionColor(tension);

                let coreAlpha =
                    (0.12 +
                        tension * 0.6) *
                    breathe;

                if (coreAlpha > 1) {
                    coreAlpha = 1;
                }

                ctx.beginPath();

                ctx.moveTo(ax, ay);
                ctx.lineTo(bx, by);

                ctx.strokeStyle =
                    `rgba(
                        ${col.r},
                        ${col.g},
                        ${col.b},
                        ${coreAlpha.toFixed(4)}
                    )`;

                ctx.lineWidth =
                    0.6 +
                    tension * 1.6;

                ctx.stroke();
            }

            // -------------------------
            // NODES
            // -------------------------

            const velocityThreshold = 3;

            for (
                let i = 0;
                i < nodeCount;
                i++
            ) {

                const vx = velX[i];
                const vy = velY[i];

                const speed =
                    Math.sqrt(
                        vx * vx +
                        vy * vy
                    );

                let brightness =
                    speed * 0.2;

                if (brightness < 0.02) {
                    continue;
                }

                if (brightness > 1) {
                    brightness = 1;
                }

                let nr;
                let ng;
                let nb;

                if (brightness < 0.25) {

                    const nf =
                        brightness / 0.25;

                    nr = 15 + nf * 10;
                    ng = 30 + nf * 170;
                    nb = 70 + nf * 185;

                } else if (brightness < 0.6) {

                    const nf =
                        (brightness - 0.25) /
                        0.35;

                    nr = 25 + nf * 210;
                    ng = 200 + nf * 20;
                    nb = 255;

                } else {

                    const nf =
                        (brightness - 0.6) /
                        0.4;

                    nr = 235 + nf * 20;
                    ng = 220 + nf * 35;
                    nb = 255;
                }

                const nodeAlpha =
                    0.12 +
                    brightness * 0.75;

                const nodeRadius =
                    0.8 +
                    brightness * 2;

                // Bloom
                if (
                    speed >
                    velocityThreshold
                ) {

                    let bloomIntensity =
                        (speed -
                            velocityThreshold) /
                        15;

                    if (
                        bloomIntensity > 1
                    ) {
                        bloomIntensity = 1;
                    }

                    const haloRadius =
                        4 +
                        bloomIntensity * 12;

                    const haloAlpha =
                        bloomIntensity *
                        0.35;

                    const haloR =
                        Math.round(
                            220 +
                            bloomIntensity * 35
                        );

                    const haloG =
                        Math.round(
                            80 +
                            bloomIntensity * 60
                        );

                    const haloB =
                        Math.round(
                            15 +
                            bloomIntensity * 40
                        );

                    ctx.beginPath();

                    ctx.arc(
                        posX[i],
                        posY[i],
                        haloRadius,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle =
                        `rgba(
                            ${haloR},
                            ${haloG},
                            ${haloB},
                            ${haloAlpha.toFixed(3)}
                        )`;

                    ctx.fill();

                    // Center
                    const coreBloomRadius =
                        2 +
                        bloomIntensity * 4;

                    const coreBloomAlpha =
                        bloomIntensity *
                        0.6;

                    ctx.beginPath();

                    ctx.arc(
                        posX[i],
                        posY[i],
                        coreBloomRadius,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle =
                        `rgba(
                            255,
                            220,
                            170,
                            ${coreBloomAlpha.toFixed(3)}
                        )`;

                    ctx.fill();
                }

                // Node
                ctx.beginPath();

                ctx.arc(
                    posX[i],
                    posY[i],
                    nodeRadius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(
                        ${Math.round(nr)},
                        ${Math.round(ng)},
                        ${Math.round(nb)},
                        ${nodeAlpha.toFixed(3)}
                    )`;

                ctx.fill();
            }

            // -------------------------
            // FLASHES
            // -------------------------

            for (
                let fi = flashes.length - 1;
                fi >= 0;
                fi--
            ) {

                const flash =
                    flashes[fi];

                flash.life -= dt * 2;

                flash.ring -=
                    dt * 1.8;

                if (flash.life <= 0) {

                    flashes.splice(
                        fi,
                        1
                    );

                    continue;
                }

                const fl =
                    flash.life;

                const flashRadius =
                    (1 - fl) * 100 +
                    20;

                const flashAlpha =
                    fl * fl * 0.8;

                const grad =
                    ctx.createRadialGradient(
                        flash.x,
                        flash.y,
                        0,
                        flash.x,
                        flash.y,
                        flashRadius
                    );

                grad.addColorStop(
                    0,
                    `rgba(
                        255,
                        210,
                        150,
                        ${flashAlpha.toFixed(3)}
                    )`
                );

                grad.addColorStop(
                    0.2,
                    `rgba(
                        240,
                        120,
                        30,
                        ${(flashAlpha * 0.6).toFixed(3)}
                    )`
                );

                grad.addColorStop(
                    0.5,
                    `rgba(
                        180,
                        70,
                        10,
                        ${(flashAlpha * 0.25).toFixed(3)}
                    )`
                );

                grad.addColorStop(
                    1,
                    "rgba(120, 40, 5, 0)"
                );

                ctx.beginPath();

                ctx.arc(
                    flash.x,
                    flash.y,
                    flashRadius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = grad;

                ctx.fill();

                // Ring
                if (
                    flash.ring > 0
                ) {

                    const ringProgress =
                        1 -
                        flash.ring;

                    const ringRadius =
                        15 +
                        ringProgress *
                        120;

                    const ringAlpha =
                        flash.ring *
                        flash.ring *
                        0.5;

                    ctx.beginPath();

                    ctx.arc(
                        flash.x,
                        flash.y,
                        ringRadius,
                        0,
                        Math.PI * 2
                    );

                    ctx.strokeStyle =
                        `rgba(
                            240,
                            130,
                            40,
                            ${ringAlpha.toFixed(3)}
                        )`;

                    ctx.lineWidth =
                        2 *
                        flash.ring;

                    ctx.stroke();
                }
            }

            ctx.globalCompositeOperation =
                "source-over";

            // -------------------------
            // VIGNETTE
            // -------------------------

            const vcx = W * 0.5;
            const vcy = H * 0.5;

            const maxDim =
                Math.max(W, H);

            const vignette =
                ctx.createRadialGradient(
                    vcx,
                    vcy,
                    maxDim * 0.25,
                    vcx,
                    vcy,
                    maxDim * 0.72
                );

            vignette.addColorStop(
                0,
                "rgba(10, 8, 6, 0)"
            );

            vignette.addColorStop(
                1,
                "rgba(10, 8, 6, 0.6)"
            );

            ctx.fillStyle = vignette;

            ctx.fillRect(
                0,
                0,
                W,
                H
            );

            animationId =
                requestAnimationFrame(
                    render
                );
        };

        // -----------------------------
        // EVENT LISTENERS
        // -----------------------------

        window.addEventListener(
            "resize",
            resize
        );

        canvas.addEventListener(
            "mousedown",
            handleMouseDown
        );

        canvas.addEventListener(
            "mousemove",
            handleMouseMove
        );

        canvas.addEventListener(
            "mouseup",
            handleMouseUp
        );

        canvas.addEventListener(
            "touchstart",
            handleTouchStart,
            { passive: false }
        );

        canvas.addEventListener(
            "touchmove",
            handleTouchMove,
            { passive: false }
        );

        canvas.addEventListener(
            "touchend",
            handleTouchEnd
        );

        // -----------------------------
        // START
        // -----------------------------

        resize();

        ctx.fillStyle = "#08080e";

        ctx.fillRect(
            0,
            0,
            W,
            H
        );

        injectImpulse();

        animationId =
            requestAnimationFrame(
                render
            );

        // -----------------------------
        // VISIBILITY
        // -----------------------------

        const handleVisibility = () => {

            if (document.hidden) {

                running = false;

            } else {

                running = true;

                lastTime = 0;

                animationId =
                    requestAnimationFrame(
                        render
                    );
            }
        };

        document.addEventListener(
            "visibilitychange",
            handleVisibility
        );

        // -----------------------------
        // CLEANUP
        // -----------------------------

        return () => {

            running = false;

            cancelAnimationFrame(
                animationId
            );

            window.removeEventListener(
                "resize",
                resize
            );

            canvas.removeEventListener(
                "mousedown",
                handleMouseDown
            );

            canvas.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            canvas.removeEventListener(
                "mouseup",
                handleMouseUp
            );

            canvas.removeEventListener(
                "touchstart",
                handleTouchStart
            );

            canvas.removeEventListener(
                "touchmove",
                handleTouchMove
            );

            canvas.removeEventListener(
                "touchend",
                handleTouchEnd
            );

            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="kinetic-grid"
        />
    );
}
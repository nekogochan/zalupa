precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

#define alpha 1.0
#define shift 1.6

const vec2 speed = vec2(0.7, 0.4);

float rand(vec2 n) {
    //This is just a compounded expression to simulate a random number based on a seed given as n
    return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
    //Uses the rand function to generate noise
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
    //fbm stands for "Fractal Brownian Motion" https://en.wikipedia.org/wiki/Fractional_Brownian_motion
    float total = 0.0, amplitude = 1.0;
    for (int i = 0; i < 4; i++) {
        total += noise(n) * amplitude;
        n += n;
        amplitude *= 0.5;
    }
    return total;
}

void main() {
    vec2 p = gl_FragCoord.xy / u_resolution.xx;
    float n = rand(p);
    gl_FragColor = vec4(vec3(n), 1.0);
}
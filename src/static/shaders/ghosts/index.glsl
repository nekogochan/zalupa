uniform vec3 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform float u_scale;
uniform float u_rand_factor;

#define alpha 1.0
#define shift 1.6

const vec2 speed = vec2(0.7, 0.4);

float rand(vec2 n) {
    //This is just a compounded expression to simulate a random number based on a seed given as n
    return fract(cos(dot(n, vec2(12.9898, 14.1414))) * u_rand_factor);
//    return texture2D(u_texture_0, fract(n)).x;
}

float noise(vec2 n) {
    //Uses the rand function to generate noise
    vec2 i = floor(n);
    vec2 f = fract(n);

    // Four corners in 2D of a tile
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return
    mix(a, b, u.x) +
    (c - a) * u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
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
    //This is where our shader comes together
    const vec3 c1 = vec3(0.3, 0.1, 0.4);
    const vec3 c2 = vec3(0.7, 0.1, 0.55);
    const vec3 c3 = vec3(-0.2, 0.1, 0.3);
    const vec3 c4 = vec3(0.5, 0.0, 1.0);
    const vec3 c5 = vec3(0.0);
    const vec3 c6 = vec3(1.0);

    //This is how "packed" the smoke is in our area. Try changing 8.0 to 1.0, or something else

    vec2 p = gl_FragCoord.xy / u_resolution.xx;

    float mouse_dist = (1.0 - distance(u_mouse / u_resolution.xx, p)) * 1.2;
    mouse_dist = sin(pow(mouse_dist, 2.0) * 4.0);
    p *= u_scale;
    gl_FragColor = vec4(vec3(mouse_dist), 1.0);
    //The fbm function takes p as its seed (so each pixel looks different) and u_time (so it shifts over u_time)
    float q = fbm(p - u_time * 0.3);
    vec2 r = vec2(fbm(p + q + u_time * speed.x - p.x - p.y), fbm(p + q - u_time * speed.y));
    vec4 c12 = vec4(mix(c1, c2, fbm(p + r)), 0.) * (1.0 - mouse_dist);
    vec4 c34 = vec4(mix(c3, c4, r.x), 0.) * (mouse_dist);
    vec4 c56 = vec4(mix(c5, c6, r.y), 0.) * (mouse_dist - 0.5);
    vec4 c = c12 + c34 - c56;
    gl_FragColor = c;
}
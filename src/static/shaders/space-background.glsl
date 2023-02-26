// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.z;

    vec3 color = vec3(1.);
    color = vec3(st.x, st.y, 0.);

    gl_FragColor = vec4(color, 1.0);
}
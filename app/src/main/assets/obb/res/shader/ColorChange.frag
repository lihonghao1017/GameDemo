#ifdef GL_ES
precision lowp float;
#endif

uniform vec3 all;
uniform vec3 red;
uniform vec3 yellow;
uniform vec3 lime;
uniform vec3 aqua;
uniform vec3 blue;
uniform vec3 magenta;
uniform mat4 rate;

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

const float HCV_EPSILON = 0.001;
const float HSL_EPSILON = 0.001;
#ifndef saturate
#define saturate(v) clamp(v, 0.0, 1.0)
#endif

vec3 rgb_to_hcv(vec3 rgb)
{
    // Based on work by Sam Hocevar and Emil Persson
    vec4 P = (rgb.g < rgb.b) ? vec4(rgb.bg, -1.0, 2.0/3.0) : vec4(rgb.gb, 0.0, -1.0/3.0);
    vec4 Q = (rgb.r < P.x) ? vec4(P.xyw, rgb.r) : vec4(rgb.r, P.yzx);
    float C = Q.x - min(Q.w, Q.y);
    float H = abs((Q.w - Q.y) / (6.0 * C + HCV_EPSILON) + Q.z);
    return saturate(vec3(H, C, Q.x));
}

vec3 hue_to_rgb(float hue)
{
    float R = abs(hue * 6.0 - 3.0) - 1.0;
    float G = 2.0 - abs(hue * 6.0 - 2.0);
    float B = 2.0 - abs(hue * 6.0 - 4.0);
    return saturate(vec3(R,G,B));
}

vec3 RGB2HSL(vec3 rgb)
{
    vec3 HCV = rgb_to_hcv(rgb);
    float L = HCV.z - HCV.y * 0.5;
    float S = HCV.y / (1.0 - abs(L * 2.0 - 1.0) + HSL_EPSILON);
    return saturate(vec3(HCV.x, S, L));
}

vec3 HSL2RGB(vec3 hsl)
{
    vec3 rgb = hue_to_rgb(hsl.x);
    float C = (1.0 - abs(2.0 * hsl.z - 1.0)) * hsl.y;
    return (rgb - 0.5) * C + hsl.z;
}

vec3 changeColor(vec3 sc, vec3 dc, float f, float t)
{
	float oh = fract(sc.x);
    float vs = float(oh >= f) * float(oh <= t);
    float h = fract(sc.x + dc.x / 2.0);
    float s = clamp(sc.y + dc.y, 0.0, 1.0);
    float v = clamp(sc.z + dc.z, 0.0, 1.0);
    return mix(sc, vec3(h, s, v), vs);
}

void main()
{
    vec4 clr = texture2D(CC_Texture0, v_texCoord);
    float a = clr.a;

    vec3 hsl = RGB2HSL(clr.rgb);

    vec3 fhsl = vec3(0.0, 0.0, 0.0);
    fhsl = fhsl + changeColor(hsl, red, 0.9167, 1.0); // red1
    fhsl = fhsl + changeColor(hsl, red, 0.0, 0.8333); // red2
    fhsl = fhsl + changeColor(hsl, yellow, 0.8333, 0.25); // yellow;
    fhsl = fhsl + changeColor(hsl, lime, 0.25, 0.4167); // lime
    fhsl = fhsl + changeColor(hsl, aqua, 0.4167, 0.5833); // aqua
    fhsl = fhsl + changeColor(hsl, blue, 0.5833, 0.75); // blue
    fhsl = fhsl + changeColor(hsl, magenta, 0.75, 0.9167); // magenta

    fhsl = changeColor(fhsl, all, 0.0, 1.0); // all

    vec3 rgb = clamp((rate * vec4(HSL2RGB(fhsl), 1.0)).rgb, 0.0, 1.0);

    gl_FragColor = float(a > 0.0) * v_fragmentColor * vec4(rgb, a);
}

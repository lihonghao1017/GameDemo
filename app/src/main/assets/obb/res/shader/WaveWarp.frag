#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform sampler2D noiseTex; // ‘Î…˘Ã˘Õº
uniform sampler2D maskTex;
uniform vec2 uvScale;
uniform vec2 uvSpeed;
uniform float noiseTimeScale;
uniform vec4 time; // (t / 20, t, t * 2, t * 3)

vec2 myfract(vec2 v)
{
    v = mod(abs(v), 2.0);
    return step(1.0, v) * (2.0 - v) + (1.0 - step(1.0, v)) * v;
}

/*
void main()
{
    vec4 noise = texture2D(noiseTex, myfract(v_texCoord - time.xy * noiseTimeScale));
    vec2 offset = vec2(noise.x * uvScale.x, noise.y * uvScale.y);
    vec4 mask = texture2D(maskTex, v_texCoord);
    gl_FragColor = texture2D(CC_Texture0, myfract(v_texCoord + step(mask.r, 0.5) * offset));
}
*/

void main()
{
    vec2 uvNoise = v_texCoord;
    uvNoise.x += time.y * uvSpeed.x;
    uvNoise.y += time.y * uvSpeed.y;
    vec4 noise = texture2D(noiseTex, myfract(uvNoise));
    vec4 mask = texture2D(maskTex, v_texCoord);
    vec2 uvWave = v_texCoord + step(mask.r, 0.5) * vec2(noise.x * uvScale.x * noiseTimeScale, noise.y * uvScale.y * noiseTimeScale);
    gl_FragColor = texture2D(CC_Texture0, myfract(uvWave));
}
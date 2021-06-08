#ifdef GL_ES
precision lowp float;
#endif

uniform vec3 toColor;

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

void main()
{
    vec4 clr = texture2D(CC_Texture0, v_texCoord);
    gl_FragColor = vec4(v_fragmentColor.rgb, clr.a * v_fragmentColor.a);
}

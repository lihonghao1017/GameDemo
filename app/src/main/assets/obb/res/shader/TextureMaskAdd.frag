#ifdef GL_ES
precision lowp float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform sampler2D maskTexture;

void main()
{
    vec4 clr = texture2D(CC_Texture0, v_texCoord) * v_fragmentColor;
    vec4 mask = texture2D(maskTexture, v_texCoord);
    //gl_FragColor = vec4(clr.r, clr.g, clr.b, mask.a);
    gl_FragColor = vec4(clr.r, clr.g, clr.b, mask.a);
}

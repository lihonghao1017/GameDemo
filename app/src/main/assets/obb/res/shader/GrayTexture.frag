#ifdef GL_ES
precision lowp float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

void main()
{
    vec4 clr = texture2D(CC_Texture0, v_texCoord);
    float gray = dot(clr.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(gray, gray, gray, clr.a);
}
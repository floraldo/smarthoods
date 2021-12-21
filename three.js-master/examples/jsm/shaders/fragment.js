/*
module.exports="#define GLSLIFY 1\nuniform float time;\nuniform float progress;\nuniform sampler2D texture1;\nuniform vec4 resolution;\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying float vOpacity;\n\nfloat PI = 3.141592653589793238;\n\nvoid main()\t{\n\tvec2 uv = vec2(gl_PointCoord.x,1. - gl_PointCoord.y);\n\tvec2 cUV = 2.*uv - 1.;\n\n\tvec3 originalColor = vec3(4./255.,10./255.,20./255.);\n\n\tvec4 color = vec4(0.08/length(cUV));\n\tcolor.rgb = min(vec3(10.),color.rgb);\n\n\tcolor.rgb *= originalColor*1200.;\n\n\tcolor *= vOpacity;\n\n\tcolor.a = min(1.,color.a)*30.;\n\n\tfloat disc = length(cUV);\n\n\t// vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\tgl_FragColor = vec4(1. - disc,0.,0.,1.)*vOpacity;\n\tgl_FragColor = vec4(color.rgb,color.a);\n\t// gl_FragColor = vec4(1.,1.,1.,1.);\n}";
*/




define GLSLIFY 1
uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
varying float vOpacity;
float PI = 3.141592653589793238;

void main() {
    
    vec2 uv = vec2(gl_PointCoord.x, 1. - gl_PointCoord.y);
    vec2 cUV = 2. * uv - 1.;
    vec3 originalColor = vec3(4. / 255., 10. / 255., 20. / 255.);
    vec4 color = vec4(0.08 / length(cUV));
    
    color.rgb = min(vec3(10.), color.rgb);
    color.rgb *= originalColor * 1200.;
    color *= vOpacity;
    color.a = min(1., color.a) * 30.;
    
    float disc = length(cUV);
    // vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

    gl_FragColor = vec4(1. - disc, 0., 0., 1.) * vOpacity;
    gl_FragColor = vec4(color.rgb, color.a);
    // gl_FragColor = vec4(1.,1.,1.,1.);
}
/*
module.exports="#define GLSLIFY 1\nuniform float time;\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying float vOpacity;\nuniform sampler2D texture1;\nattribute float opacity;\nfloat PI = 3.141592653589793238;\nvoid main() {\n  vUv = uv;\n  vOpacity = opacity;\n  vec4 mvPosition = modelViewMatrix * vec4( position, 1. );\n  gl_PointSize = 30000. * ( 1. / - mvPosition.z );\n  gl_Position = projectionMatrix * mvPosition;\n}";

*/




//module.exports="#
define GLSLIFY 1 
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
varying float vOpacity;
uniform sampler2D texture1;
attribute float opacity;
float PI = 3.141592653589793238;

void main() {
    
    vUv = uv;
    vOpacity = opacity;
    
    vec4 mvPosition = modelViewMatrix * vec4( position, 1. );
    
    gl_PointSize = 30000. * ( 1. / - mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
    
}
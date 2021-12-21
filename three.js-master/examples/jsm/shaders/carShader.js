import {
	Vector2
} from '../../../build/three.module.js';

/**
 * Depth-of-field shader with bokeh
 * ported from GLSL shader by Martins Upitis
 * http://blenderartists.org/forum/showthread.php?237488-GLSL-depth-of-field-with-bokeh-v2-4-(update)
 *
 * Requires #define RINGS and SAMPLES integers
 */
const carShader = {

	uniforms: {

		'textureWidth': { value: 1.0 },
		'textureHeight': { value: 1.0 },

		'focalDepth': { value: 1.0 },
		'focalLength': { value: 24.0 },
		'fstop': { value: 0.9 },

		'tColor': { value: null },
		'tDepth': { value: null },

		'maxblur': { value: 1.0 },

		'showFocus': { value: 0 },
		'manualdof': { value: 0 },
		'vignetting': { value: 0 },
		'depthblur': { value: 0 },

		'threshold': { value: 0.5 },
		'gain': { value: 2.0 },
		'bias': { value: 0.5 },
		'fringe': { value: 0.7 },

		'znear': { value: 0.1 },
		'zfar': { value: 100 },

		'noise': { value: 1 },
		'dithering': { value: 0.0001 },
		'pentagon': { value: 0 },

		'shaderFocus': { value: 1 },
		'focusCoords': { value: new Vector2() }


	},

	vertexShader: /* glsl */`

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

        }`,

	fragmentShader: /* glsl */`

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

`

};
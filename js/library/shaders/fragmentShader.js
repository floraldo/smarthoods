<script id="vertexShader" type="x-shader/x-vertex">

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

    </script>


    <script id="fragmentShader" type="x-shader/x-fragment">


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
            vec4 color = vec4(0.01 / length(cUV)); // grootte

            color.rgb = min(vec3(10.), color.rgb);
            color.rgb *= originalColor * 1200.;
            color *= vOpacity;
            color.a = min(1., color.a) * 30.;

            float disc = length(cUV) ;
            // vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

            gl_FragColor = vec4(1. - disc, 0., 0., 1.) * vOpacity;
            gl_FragColor = vec4(color.rgb, color.a);
            // gl_FragColor = vec4(1.,1.,1.,1.);
        }

    </script>
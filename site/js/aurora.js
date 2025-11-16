/**
 * Aurora Borealis WebGL Background Effect
 * Pure WebGL implementation (no external dependencies)
 * Adapted from reactbits.dev/backgrounds/aurora
 */

const VERT_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG_SHADER = `
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  // Color interpolation
  vec3 rampColor;
  if (uv.x < 0.5) {
    float t = uv.x * 2.0;
    rampColor = mix(uColorStops[0], uColorStops[1], t);
  } else {
    float t = (uv.x - 0.5) * 2.0;
    rampColor = mix(uColorStops[1], uColorStops[2], t);
  }
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  gl_FragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

/**
 * Convert hex color to RGB array [0-1 range]
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ] : [0, 0, 0];
}

/**
 * Create and compile a WebGL shader
 */
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  
  return shader;
}

/**
 * Create WebGL program from shaders
 */
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  
  return program;
}

/**
 * Initialize Aurora effect on a container element
 */
function initAurora(container, options = {}) {
  const {
    colorStops = ['#0E4D3F', '#127C62', '#F3A712'],
    amplitude = 1.0,
    blend = 0.5,
    speed = 0.5
  } = options;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  // Get WebGL context
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true
  });

  if (!gl) {
    console.error('WebGL not supported');
    return () => {};
  }

  // Enable blending for transparency
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  // Compile shaders and create program
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERT_SHADER);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAG_SHADER);
  const program = createProgram(gl, vertexShader, fragmentShader);

  if (!program) {
    console.error('Failed to create shader program');
    return () => {};
  }

  // Set up geometry (full-screen triangle)
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = new Float32Array([
    -1, -1,
     3, -1,
    -1,  3
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  // Get attribute and uniform locations
  const positionLocation = gl.getAttribLocation(program, 'position');
  const uTimeLocation = gl.getUniformLocation(program, 'uTime');
  const uAmplitudeLocation = gl.getUniformLocation(program, 'uAmplitude');
  const uColorStopsLocation = gl.getUniformLocation(program, 'uColorStops');
  const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
  const uBlendLocation = gl.getUniformLocation(program, 'uBlend');

  // Convert color stops to RGB arrays
  const colorStopsRgb = colorStops.map(hex => hexToRgb(hex));

  // Resize handler
  function resize() {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  }

  window.addEventListener('resize', resize);
  resize();

  // Animation loop
  let animateId = 0;
  
  function render(time) {
    animateId = requestAnimationFrame(render);
    
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Use program
    gl.useProgram(program);
    
    // Set up position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Set uniforms
    gl.uniform1f(uTimeLocation, time * speed * 0.001);
    gl.uniform1f(uAmplitudeLocation, amplitude);
    gl.uniform1f(uBlendLocation, blend);
    gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
    
    // Set color stops (flatten array)
    const flatColors = colorStopsRgb.flat();
    gl.uniform3fv(uColorStopsLocation, flatColors);
    
    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  
  animateId = requestAnimationFrame(render);

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animateId);
    window.removeEventListener('resize', resize);
    if (canvas.parentNode === container) {
      container.removeChild(canvas);
    }
    // Clean up WebGL resources
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteBuffer(positionBuffer);
  };
}

// Auto-initialize Aurora on page load
if (typeof window !== 'undefined') {
  function initWhenReady() {
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (!heroOverlay) {
      console.warn('Aurora: .hero-overlay element not found');
      return;
    }
    
    console.log('Aurora: Initializing with emerald theme colors');
    try {
      initAurora(heroOverlay, {
        colorStops: ['#0E4D3F', '#127C62', '#F3A712'],
        amplitude: 1.2,
        blend: 0.6,
        speed: 0.4
      });
      console.log('Aurora: Successfully initialized');
    } catch (error) {
      console.error('Aurora: Initialization failed', error);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }
}

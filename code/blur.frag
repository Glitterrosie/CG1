precision lowp float;

// uniform input values are shared between fragments
// input image
uniform sampler2D u_texture;
// resolution of input image
uniform vec2 u_resolution;
// radius for blur kernel
uniform float u_radius;

layout(location = 0) out vec4 fragColor;

// varying input values are set by the vertex shader
// texture coordinate of current fragment
in vec2 v_uv;

void main(void)
{
    vec3 sum;
    float k = u_radius;

    vec2 pixelSize = 1.0 / u_resolution;

    vec2 kernelPosition;

    for(float i = -k; i <= k; i++) {
        for(float j = -k; j <= k; j++) {
            kernelPosition = pixelSize * vec2(i, j) + v_uv;
            //da der kernel an jeder Stelle 1 beinhaltet multiplizieren wir nur mit dem Normalisierungsfanktor
            sum += texture(u_texture, kernelPosition).rgb * (1.0/pow(2.0*k+1.0,2.0));
        }
    }

    //hier müssen wir beachten, dass die rgb-Werte nicht 0<=rgb-Werte<=1
    fragColor = vec4(clamp(sum, 0.0, 1.0), 1.0);

}

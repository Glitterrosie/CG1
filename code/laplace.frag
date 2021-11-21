precision lowp float;

// uniform input values are shared between fragments
// input image
uniform sampler2D u_texture;
// resolution of input image
uniform vec2 u_resolution;

layout(location = 0) out vec4 fragColor;

// varying input values are set by the vertex shader
// texture coordinate of current fragment
in vec2 v_uv;

// TODO: set correct kernel
// kernel for weighting the neighboring pixels
const mat3 kernel = mat3(
    1, 1, 1, // first column
    1, -8, 1, // second column
    1, 1, 1 // third column
);

void main(void)
{
    // TODO - implement laplace

    vec3 sum;

    vec2 pixelSize = 1.0 / u_resolution;

    vec2 kernelPosition;
    float kernelValue;


    //wir iterieren über den Kernel
    //da dieser eine feste Größe von 3x3 hat gehen wir von -1 bis 1
    for(int i = -1; i <= 1; i++) {
        for(int j = -1; j <= 1; j++) {
            // position to be sampled - center plus offset
            kernelPosition = pixelSize * vec2(i, j) + v_uv;
            //Wert aus Kernel lesen
            kernelValue = kernel[j + 1][i + 1];
            //mit Kernel-Wert multiplizieren und aufsummieren
            sum += texture(u_texture, kernelPosition).rgb * kernelValue;
        }
    }
    //hier müssen wir beachten, dass die rgb-Werte nicht 0<=rgb-Werte<=1
    fragColor = vec4(clamp(sum, 0.0, 1.0), 1.0);
}

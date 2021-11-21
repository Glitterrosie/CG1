/**
 * Laplace edge detection implemented using the CPU.
 * Loops over all pixels and uses the given kernel to calculate a local
 * gradient. Areas without edges will turn out black, since the differences
 * are small, while areas with high differences will stand out.
 */
export function laplace(
    inputImage: Uint8Array, outputImage: Uint8Array,
    width: number, height: number
): void {

    // TODO: set correct kernel
    // kernel for weighting the neighboring pixels
    //wir beziehen die diagonalen Kanten in unsere Gewichtung mit ein
    const kernel = [
        [1, 1, 1],
        [1, -8, 1],
        [1, 1, 1],
    ];

    // TODO: implement edge detection

    //wir gehen durch den input
    for(var i=0; i<width; i++){
        for(var j=0; j<height; j++){
            //initialisieren Farbewerte
            let r = 0;
            let g = 0;
            let b = 0;
            for(var u=-1; u<=1; u++){
                var indexX=i+u;
                if (indexX < 0 || indexX >= width) {
                    continue;
                }
                for(var v=-1; v<=1; v++){
                    var indexY=j+v;
                    if (indexY < 0 || indexY >= height) {
                        continue;
                    }
                    //im Input-Image springen wir an die Stelle die wir gerade untersuchen
                    const index = (indexX + indexY * width) * 3;
                    //wir lesen den Wert des Kernels an der Stelle
                    const kernelValue = kernel[u+1][v+1];
                    //berechnen rgb-Werte durch aufsummieren
                    r += inputImage[index] * kernelValue;
                    g += inputImage[index + 1] * kernelValue;
                    b += inputImage[index + 2] * kernelValue;

                }
            }
            //Output Pixel berechnen
            const index = (i + j * width) * 3;
            //hier müssen wir sicherstellen, dass 0<=rgb-Werte<=255
            outputImage[index] = Math.max(Math.min(r, 255), 0);
            outputImage[index + 1] = Math.max(Math.min(g, 255), 0);
            outputImage[index + 2] = Math.max(Math.min(b, 255), 0);

        }
    }

}

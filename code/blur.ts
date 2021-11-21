type args = { blurRadius: number };

/**
 * Box blur implemented using the CPU.
 * Loops over all pixels and uses the radius stored in this._blurRadius to
 * average all pixels in a square box to calculate the output values.
 */
export function blur(
    inputImage: Uint8Array, outputImage: Uint8Array,
    width: number, height: number, { blurRadius }: args
): void {
    // TODO: implement blur

    var k=blurRadius;
    
    /* Dies ist ein Artefakt von unserer ersten Implementierung. Dort haben wir zunächst eine Matrix
    passender Größe erstellt. Da aber beim Blur-Filter an jeder Stelle im Kernel eine 1 steht, brauchen
    wir das eigentlich gar nicht. */
    
    // let kernel: Array<number>[] = [];
    // for(var i=0; i<2*k+1; i++){
    //     kernel.push([]);
    //     for(var j=0; j<2*k+1; j++){
    //         kernel[i][j]=1/((2*k+1)*(2*k+1));
    //     }
    // }

    //wir gehen durch den input
    for(var i=0; i<width; i++){
        for(var j=0; j<height; j++){
            //initialisieren Farbewerte
            let r = 0;
            let g = 0;
            let b = 0;
            //wir iterieren quasi über den Kernel und berechnen die Positionen der Nachbarpixel
            //im Folgenden geben indexX und indexY die Position im Kernel an
            for(var u=-k; u<=k; u++){
                var indexX=i+u;
                if (indexX < 0 || indexX >= width) {
                    continue;
                }
                for(var v=-k; v<=k; v++){
                    var indexY=j+v;
                    if (indexY < 0 || indexY >= height) {
                        continue;
                    }
                    //im Input-Image springen wir an die Stelle die wir gerade untersuchen
                    const index = (indexX + indexY * width) * 3;
                    //da alle Werte im Kernel gleich 1 sind multiplizieren wir lediglich mit dem Neutralisierungsfaktor
                    const neutFractor = 1/((2*k+1)*(2*k+1));
                    //Änderung der rgb-Werte durch aufsummieren
                    r += inputImage[index] * neutFractor;
                    g += inputImage[index + 1] * neutFractor;
                    b += inputImage[index + 2] * neutFractor;
                }
            }
            //Output Pixel berechnen
            const index = (i + j * width) * 3;
            //hier müssen wir sicherstellen, dass 0<=rgb-Werte<=255
            outputImage[index] = Math.max(Math.min(r, 255), 0);
            outputImage[index] = Math.max(Math.min(r, 255), 0);
            outputImage[index + 1] = Math.max(Math.min(g, 255), 0);
            outputImage[index + 2] = Math.max(Math.min(b, 255), 0);
        }
    }
}

export class Typer {
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({
            highlightSpeed: 100,
            typeSpeed: 100,
            clearDelay: 500,
            typeDelay: 500,
            clearOnHighlight: true,
            typerInterval: 4000
        }, options);

        // Parse targets from data attribute if not provided
        if (!this.options.targets) {
            const dataAttr = this.element.getAttribute('data-typer-targets');
            try {
                this.targets = JSON.parse(dataAttr).targets;
            } catch (e) {
                this.targets = dataAttr.split(',').map(t => t.trim());
            }
        } else {
            this.targets = this.options.targets;
        }

        this.init();
    }

    init() {
        this.intervalId = setInterval(() => {
            this.typeRandom();
        }, this.options.typerInterval);
        this.typeRandom();
    }

    typeRandom() {
        const target = this.targets[Math.floor(Math.random() * this.targets.length)];
        this.typeTo(target);
    }

    async typeTo(text) {
        const currentText = this.element.textContent;
        if (currentText === text) return;

        // Determine common prefix
        let i = 0;
        while (i < currentText.length && i < text.length && currentText[i] === text[i]) {
            i++;
        }

        // Highlight/Delete difference
        const leftStop = i;
        const rightStop = currentText.length;

        await this.highlightAndDelete(leftStop, rightStop);

        // Type new text
        const textToType = text.substring(leftStop);
        await this.typeText(textToType);
    }

    highlightAndDelete(leftStop, rightStop) {
        return new Promise(resolve => {
            let currentRight = rightStop;

            const step = () => {
                if (currentRight <= leftStop) {
                    // Deleted all needed, wait clear delay
                    setTimeout(() => {
                        this.element.textContent = this.element.textContent.substring(0, leftStop);
                        resolve();
                    }, this.options.clearDelay);
                    return;
                }

                // Highlight effect (simulated by just deleting for simplicity in Vanilla, 
                // or could wrap in span. For valid replacement of original plugin which mostly deleted:
                // Original plugin used background color selection effect. We will approximate with backspace 
                // for cleaner vanilla implementation unless "highlight" is critical. 
                // The original logic was complex creating spans. Let's do a simple typing effect first specific to the requests.)

                // Actually, let's just delete char by char for a "backspace" effect which is often cleaner.
                // If the user wants the highlight style specifically, we can add it, but backspace is standard "typer".
                this.element.textContent = this.element.textContent.substring(0, currentRight - 1);
                currentRight--;
                setTimeout(step, this.options.highlightSpeed);
            };

            step();
        });
    }

    typeText(text) {
        return new Promise(resolve => {
            let i = 0;
            const step = () => {
                if (i >= text.length) {
                    resolve();
                    return;
                }
                this.element.textContent += text[i];
                i++;
                setTimeout(step, this.options.typeSpeed);
            };
            setTimeout(step, this.options.typeDelay);
        });
    }
}

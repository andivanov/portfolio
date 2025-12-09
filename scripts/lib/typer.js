export class Typer {
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({
            highlightSpeed: 100,
            typeSpeed: 100,
            clearDelay: 500,
            typeDelay: 500,
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

        this.abortController = new AbortController();
        this.loop(this.abortController.signal);
    }

    // Utility to wait for ms
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async loop(signal) {
        while (!signal.aborted) {
            await this.typeRandom();
            await this.wait(this.options.typerInterval);
        }
    }

    async typeRandom() {
        const target = this.targets[Math.floor(Math.random() * this.targets.length)];
        await this.typeTo(target);
    }

    async typeTo(text) {
        const currentText = this.element.textContent;
        if (currentText === text) return;

        // Determine common prefix
        let i = 0;
        while (i < currentText.length && i < text.length && currentText[i] === text[i]) {
            i++;
        }

        const leftStop = i;

        // 1. Delete characters (Simulated highlight/delete)
        await this.deleteTo(leftStop);

        // 2. Wait clear delay
        if (leftStop < currentText.length) {
            await this.wait(this.options.clearDelay);
        }

        // 3. Type new characters
        const textToType = text.substring(leftStop);
        await this.typeText(textToType);
    }

    async deleteTo(targetLength) {
        let currentText = this.element.textContent;
        while (currentText.length > targetLength) {
            currentText = currentText.substring(0, currentText.length - 1);
            this.element.textContent = currentText;
            await this.wait(this.options.highlightSpeed);
        }
    }

    async typeText(text) {
        await this.wait(this.options.typeDelay);
        for (const char of text) {
            this.element.textContent += char;
            await this.wait(this.options.typeSpeed);
        }
    }
}


import * as Blockly from 'blockly';

const ENTER_FULLSCREEN_ICON = createIconDataUri(
    '<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>'
);

const EXIT_FULLSCREEN_ICON = createIconDataUri(
    '<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>'
);

function createIconDataUri(path: string): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#546E7A">${path}</svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export class FullscreenControl implements Blockly.IPositionable {
    readonly id = 'fullscreenControl';

    private readonly width = 32;
    private readonly height = 32;
    private readonly marginVertical = 20;
    private readonly marginHorizontal = 20;

    private svgImage: SVGImageElement | null = null;
    private left = 0;
    private top = 0;
    private initialized = false;
    private isViewportFullscreen = false;
    private pointerDownBinding: Blockly.browserEvents.Data | null = null;
    private keyDownBinding: Blockly.browserEvents.Data | null = null;

    constructor(private readonly workspace: Blockly.WorkspaceSvg) {}

    init(): void {
        this.workspace.getComponentManager().addComponent({
            component: this,
            weight: 2,
            capabilities: [Blockly.ComponentManager.Capability.POSITIONABLE],
        });

        this.createDom();
        document.addEventListener('fullscreenchange', this.handleFullscreenChange);
        this.initialized = true;
        this.workspace.resize();
    }

    dispose(): void {
        document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
        if (this.isViewportFullscreen) {
            this.isViewportFullscreen = false;
            this.workspace.getInjectionDiv().classList.remove('blocklyViewportFullscreen');
            document.body.classList.remove('blocklyFullscreenActive');
        }

        if (this.pointerDownBinding) {
            Blockly.browserEvents.unbind(this.pointerDownBinding);
            this.pointerDownBinding = null;
        }

        if (this.keyDownBinding) {
            Blockly.browserEvents.unbind(this.keyDownBinding);
            this.keyDownBinding = null;
        }

        if (this.svgImage) {
            Blockly.utils.dom.removeNode(this.svgImage);
            this.svgImage = null;
        }

    }

    getBoundingRectangle(): Blockly.utils.Rect {
        return new Blockly.utils.Rect(
            this.top,
            this.top + this.height,
            this.left,
            this.left + this.width
        );
    }

    position(
        metrics: Blockly.MetricsManager.UiMetrics,
        savedPositions: Blockly.utils.Rect[]
    ): void {
        if (!this.initialized || !this.svgImage) return;

        const hasVerticalScrollbars =
            this.workspace.scrollbar && this.workspace.scrollbar.canScrollHorizontally();
        const hasHorizontalScrollbars =
            this.workspace.scrollbar && this.workspace.scrollbar.canScrollVertically();

        if (
            metrics.toolboxMetrics.position === Blockly.TOOLBOX_AT_LEFT ||
            (this.workspace.horizontalLayout && !this.workspace.RTL)
        ) {
            this.left =
                metrics.absoluteMetrics.left +
                metrics.viewMetrics.width -
                this.width -
                this.marginHorizontal;

            if (hasVerticalScrollbars && !this.workspace.RTL) {
                this.left -= Blockly.Scrollbar.scrollbarThickness;
            }
        } else {
            this.left = this.marginHorizontal;
            if (hasVerticalScrollbars && this.workspace.RTL) {
                this.left += Blockly.Scrollbar.scrollbarThickness;
            }
        }

        const startAtBottom = metrics.toolboxMetrics.position !== Blockly.TOOLBOX_AT_BOTTOM;
        if (startAtBottom) {
            this.top =
                metrics.absoluteMetrics.top +
                metrics.viewMetrics.height -
                this.height -
                this.marginVertical;

            if (hasHorizontalScrollbars) {
                this.top -= Blockly.Scrollbar.scrollbarThickness;
            }
        } else {
            this.top = metrics.absoluteMetrics.top + this.marginVertical;
        }

        let boundingRect = this.getBoundingRectangle();
        for (let index = 0; index < savedPositions.length; index += 1) {
            const otherPosition = savedPositions[index];
            if (!boundingRect.intersects(otherPosition)) continue;

            this.top = startAtBottom
                ? otherPosition.top - this.height - this.marginVertical
                : otherPosition.bottom + this.marginVertical;
            boundingRect = this.getBoundingRectangle();
            index = -1;
        }

        this.svgImage.setAttribute('transform', `translate(${this.left}, ${this.top})`);
    }

    private createDom(): void {
        this.svgImage = Blockly.utils.dom.createSvgElement(Blockly.utils.Svg.IMAGE, {
            width: `${this.width}px`,
            height: `${this.height}px`,
            class: 'blocklyFullscreenControl',
            role: 'button',
            tabindex: '0',
        }) as SVGImageElement;

        this.updateIcon();
        Blockly.utils.dom.insertAfter(this.svgImage, this.workspace.getBubbleCanvas());

        this.pointerDownBinding = Blockly.browserEvents.conditionalBind(
            this.svgImage,
            'pointerdown',
            null,
            this.handlePointerDown
        );
        this.keyDownBinding = Blockly.browserEvents.conditionalBind(
            this.svgImage,
            'keydown',
            null,
            this.handleKeyDown
        );
    }

    private readonly handlePointerDown = (event: PointerEvent): void => {
        event.stopPropagation();
        event.preventDefault();
        void this.toggleFullscreen();
    };

    private readonly handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.stopPropagation();
        event.preventDefault();
        void this.toggleFullscreen();
    };

    private readonly handleFullscreenChange = (): void => {
        this.updateIcon();
        window.requestAnimationFrame(() => Blockly.svgResize(this.workspace));
    };

    private async toggleFullscreen(): Promise<void> {
        const injectionDiv = this.workspace.getInjectionDiv();

        if (document.fullscreenElement === injectionDiv) {
            await document.exitFullscreen();
            return;
        }

        if (this.isViewportFullscreen) {
            this.setViewportFullscreen(false);
            return;
        }

        try {
            if (injectionDiv.requestFullscreen) {
                await injectionDiv.requestFullscreen();
                return;
            }
        } catch {
            // Some browsers or embedded contexts do not grant native fullscreen.
        }

        this.setViewportFullscreen(true);
    }

    private setViewportFullscreen(active: boolean): void {
        this.isViewportFullscreen = active;
        this.workspace.getInjectionDiv().classList.toggle('blocklyViewportFullscreen', active);
        document.body.classList.toggle('blocklyFullscreenActive', active);
        this.handleFullscreenChange();
    }

    private updateIcon(): void {
        if (!this.svgImage) return;

        const isFullscreen =
            document.fullscreenElement === this.workspace.getInjectionDiv() ||
            this.isViewportFullscreen;
        const label = isFullscreen ? 'Έξοδος από πλήρη οθόνη' : 'Πλήρης οθόνη';
        const icon = isFullscreen ? EXIT_FULLSCREEN_ICON : ENTER_FULLSCREEN_ICON;

        this.svgImage.setAttribute('href', icon);
        this.svgImage.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', icon);
        this.svgImage.setAttribute('aria-label', label);
        this.svgImage.setAttribute('title', label);
    }
}

Blockly.Css.register(`
.blocklyFullscreenControl {
  cursor: pointer;
  opacity: 0.4;
}
.blocklyFullscreenControl:hover,
.blocklyFullscreenControl:focus {
  opacity: 0.6;
  outline: none;
}
.blocklyFullscreenControl:active {
  opacity: 0.8;
}
`);

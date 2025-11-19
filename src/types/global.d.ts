// Type declarations for Blockly plugins without official types
declare module '@blockly/continuous-toolbox' {
    import Blockly from 'blockly';

    export class ContinuousToolbox extends Blockly.Toolbox {}
    export class ContinuousFlyout extends Blockly.Flyout {}
    export class ContinuousMetrics extends Blockly.MetricsManager {}
}

declare module '@blockly/zoom-to-fit' {
    import Blockly from 'blockly';

    export class ZoomToFitControl {
        constructor(workspace: Blockly.WorkspaceSvg);
        init(): void;
    }
}

declare module '@blockly/theme-dark' {
    import Blockly from 'blockly';

    const DarkTheme: Blockly.Theme;
    export default DarkTheme;
}

// Type declarations for showdown
declare module 'showdown' {
    class Converter {
        constructor(options?: Record<string, unknown>);
        makeHtml(text: string): string;
        setOption(key: string, value: unknown): void;
    }

    const showdown: {
        Converter: typeof Converter;
    };

    export default showdown;
}

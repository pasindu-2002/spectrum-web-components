import  tooltipConfig  from "../orchestrators/tooltip.config.json";

interface TooltipConfig {
    content: string
}

const config: TooltipConfig = tooltipConfig;

const tooltip =  document.createElement('pl-tooltip');

tooltip.content = config.content;

document.querySelector('#tooltip')?.appendChild(tooltip);

setTimeout(async () => {
    await tooltip.open();
}, 0);
  
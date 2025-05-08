
import html2canvas from 'html2canvas';

export const takeScreenshot = async (elementId: string, filename: string = 'dashboard-screenshot'): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }
    
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      logging: false,
      scale: 2, // Higher quality
    });
    
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error taking screenshot:', error);
    throw error;
  }
};

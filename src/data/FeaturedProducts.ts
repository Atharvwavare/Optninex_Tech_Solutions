// src/data/productsData.ts

import ptzCamera from "../images/optenix_4k_ptz_camera.jpeg";
import flatPanel from "../images/interactive_flat_panel.png";
import microphones from "../images/Dual_microphones.png"

export const products = [
  {
    name: "Optenix 4K AI PTZ Camera",
    image: ptzCamera,
    specifications: [
      "AI Auto Tracking & Auto Framing",
      "4K Ultra HD Sony CMOS Sensor",
      "12X Optical + 16X Digital Zoom",
      "HDMI + SDI + IP + USB Outputs",
      "Low Light Noise Reduction",
      "Remote Control via Network & USB",
    ],
  },
  {
    name: "Interactive Flat Panel S1 Series",
    image: flatPanel,
    specifications: [
      "Available Sizes: 65”, 75”, 86”",
      "4K Ultra HD – 3840 × 2160 (H × V)",
      "Brightness: 400 nits",
      "Eye Care Technology: TÜV Low Blue Light Certified & TÜV Flicker-Free Technology",
      "Contrast Ratio: 1,200 : 1 (Typical), 50,000 : 1 (Dynamic)",
      "Color Performance: 1.07 Billion Colors (10-bit), 72% NTSC, Delta E ≤ 2",
      "Backlight Life: Up to 50,000 Hours",
      "Operating System: Android 13.0",
      "CPU: 2.0 GHz Quad-Core ARM A55",
      "GPU: Mali-G52 MP2",
      "RAM: 8 GB",
      "Storage (ROM): 128 GB",
    ],
  },
  {
    name: "Dual GooseNeck Microphones",
    image: microphones,
    specifications: [
      "Touch Control Panel",
      "Integrated Mic System",
      "HDMI & USB Ports",
      "Built-in Amplifier",
      "Lockable Storage",
            "RAM: 8 GB",
      "Storage (ROM): 128 GB",

    ],
  },
];

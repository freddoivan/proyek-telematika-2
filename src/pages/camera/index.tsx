"use client"

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import { useEffect, useRef } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { Layout } from '@/components/Layout';
import apiMock from '@/lib/axios-mock';
import toast from 'react-hot-toast';
import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";
import { dataURItoBlob } from '@/lib/helper';

export default function Index() {
  const videoRef = useRef<HTMLVideoElement | null>(null);;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const user = useAuthStore.useUser();

  

  //Perlu Explor lagi untuk mendpatkan data per segment "maskValueToColor / maskValueToLabel" function
  useEffect(() => {
    async function loadBodyPix() {
      const segmenter = await bodySegmentation.createSegmenter(bodySegmentation.SupportedModels.BodyPix);
      const video = videoRef.current!;
      const canvas = canvasRef.current!;

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();

        async function detectBody() {
          const segmentation = await segmenter?.segmentPeople(video, { multiSegmentation: false, segmentBodyParts: true });
          const coloredPartImage = await bodySegmentation.toColoredMask(segmentation, bodySegmentation.bodyPixMaskValueToRainbowColor, { r: 255, g: 255, b: 255, a: 255 });
          const opacity = 0.5;
          const flipHorizontal = false;
          const maskBlurAmount = 0;
          bodySegmentation.drawMask(
            canvas, video, coloredPartImage, opacity, maskBlurAmount,
            flipHorizontal);
          requestAnimationFrame(detectBody);
        }
        
        detectBody();
      };
    }

    loadBodyPix();
  }, []);

  return (
    <Layout>
       <div className='flex flex-col'>
      <div className='flex flex-col justify-center items-center md:flex-row md:justify-between'>
        <video ref={videoRef} autoPlay playsInline muted width="640" height="480" />
        <canvas ref={canvasRef} width="640" height="480" />
      </div>
      <div className='flex items-center justify-center'>
        <button className='border p-2 shadow-md rounded-md' onClick={ async () => {
          const canvas = canvasRef.current;
          const a = document.createElement('a');
          a.href = canvas!.toDataURL();
          const image = canvas!.toDataURL();
          let file = dataURItoBlob(image)
          a.download = `${Date.now().toString()}${user?.name}.png`;
          const form = new FormData();
          form.append('image', file);
          toast.promise(
            apiMock.post('/image/upload',form,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }),
            {
              ...DEFAULT_TOAST_MESSAGE,
              success: 'Successfully Upload Image',
            }
          )
          // a.click();
        }
        }>Capture</button>
      </div>

      {/* <div className='absolute w-full bg-black opacity-80 h-full overflow-hidden'>
        <div className='flex flex-col items-center justify-center h-full'>
          <p className='text-white text-2xl'>Please stand in front of the camera</p>
          <p className='text-white text-2xl'>and make sure your body is visible</p>
        </div>
      </div> */}
    </div>
    </Layout>
   
  );
}
export const config = {
  api: {
      bodyParser: false, // Disallow body parsing, consume as stream
  },
}
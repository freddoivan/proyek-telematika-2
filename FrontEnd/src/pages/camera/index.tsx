"use client"

import * as tf from '@tensorflow/tfjs';
import { useEffect, useRef, useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { Layout } from '@/components/Layout';
import apiMock from '@/lib/axios-mock';
import toast from 'react-hot-toast';
import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";
import { dataURItoBlob } from '@/lib/helper';

export default function Index() {
  const [loading, setLoading] = useState<Boolean>();
  const [weightStatus, setWeightStatus] = useState('');
  const [baseModel, setBaseModel] = useState<tf.LayersModel>();
  const [model, setModel] = useState<tf.LayersModel>();
  
  const videoRef = useRef<HTMLVideoElement | null>(null);;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const user = useAuthStore.useUser();

  

  //Perlu Explor lagi untuk mendpatkan data per segment "maskValueToColor / maskValueToLabel" function
  useEffect(() => {
    async function setupModal() {
      setLoading(true);
      tf.setBackend('webgl');
      const video = videoRef.current!;
      
      const baseModel = await tf.loadLayersModel('models/base_model.json');
      const model = await tf.loadLayersModel('models/model.json');
      setBaseModel(baseModel);
      setModel(model);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;    
      setLoading(false);
    }

    setupModal();
  }, []);

  return (
    <Layout>
       <div className='flex flex-col'>

      <div className='flex flex-col justify-center items-center md:flex-row md:justify-between'>
        <video ref={videoRef} autoPlay playsInline muted width="640" height="480" />
      </div>
      <div className='flex items-center justify-center'>
        <button className='border p-2 shadow-md rounded-md' onClick={ async () => {
          if (baseModel && model) {
            const video = videoRef.current!;
            let pixel = tf.browser.fromPixels(video, 3).resizeNearestNeighbor([224, 224]).expandDims(0);
            const baseModelPred = baseModel.predict(pixel);
            const pred = model.predict(baseModelPred) as tf.Tensor;
            const bmi = ((await pred.array()) as number[][])[0][0];

            if (bmi < 15) {
              setWeightStatus("Very severely underweight");
            } else if (15 >= bmi && bmi < 16) {
              setWeightStatus("Severely underweight");
            } else if (16 >= bmi && bmi < 18.5) {
              setWeightStatus("Underweight");
            } else if (18.5 >= bmi && bmi < 25) {
              setWeightStatus("Normal");
            } else if (25 >= bmi && bmi < 30) {
              setWeightStatus("Overweight");
            } else if (30 >= bmi && bmi < 35) {
              setWeightStatus("Moderately obese");
            } else if (35 >= bmi && bmi < 40) {
              setWeightStatus("Severely obese");
            } else {
              setWeightStatus("Very severely obese");
            }
          }
          // const canvas = canvasRef.current;
          // const a = document.createElement('a');
          // a.href = canvas!.toDataURL();
          // const image = canvas!.toDataURL();
          // let file = dataURItoBlob(image)
          // a.download = `${Date.now().toString()}${user?.name}.png`;
          // const form = new FormData();
          // form.append('image', file);
          // toast.promise(
          //   apiMock.post('/image/upload',form,{
          //     headers: {
          //       'Content-Type': 'multipart/form-data'
          //     }
          //   }),
          //   {
          //     ...DEFAULT_TOAST_MESSAGE,
          //     success: 'Successfully Upload Image',
          //   }
          // )
          // a.click();
        }
        }>{loading ? "Loading" : "Capture and Classify"}</button>
      </div>
      <h2>{weightStatus}</h2>

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
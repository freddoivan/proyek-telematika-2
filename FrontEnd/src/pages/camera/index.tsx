"use client";

import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { Layout } from "@/components/Layout";
import apiMock from "@/lib/axios-mock";
import toast from "react-hot-toast";
import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";
import { dataURItoBlob } from "@/lib/helper";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import { useRouter } from "next/router";

export default function Index() {
  const [loading, setLoading] = useState<Boolean>();
  const ref = useRef<HTMLDivElement>(null);
  const [weightStatus, setWeightStatus] = useState("");
  const [baseModel, setBaseModel] = useState<tf.LayersModel>();
  const [model, setModel] = useState<tf.LayersModel>();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const user = useAuthStore.useUser();
  const navigate = useRouter()

  //Perlu Explor lagi untuk mendpatkan data per segment "maskValueToColor / maskValueToLabel" function
  useEffect(() => {
    async function setupModal() {
      ref.current?.scrollIntoView({ behavior: "smooth" });
      setLoading(true);
      const segmenter = await bodySegmentation.createSegmenter(
        bodySegmentation.SupportedModels.BodyPix
      );
      tf.setBackend("webgl");
      const video = videoRef.current!;
      const canvas = canvasRef.current!;

      const baseModel = await tf.loadLayersModel("models/base_model.json");
      const model = await tf.loadLayersModel("models/model.json");
      setBaseModel(baseModel);
      setModel(model);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      setLoading(false);
      video.onloadedmetadata = () => {
        video.play();

        async function detectBody() {
          const segmentation = await segmenter?.segmentPeople(video, {
            multiSegmentation: false,
            segmentBodyParts: true,
          });
          const coloredPartImage = await bodySegmentation.toColoredMask(
            segmentation,
            bodySegmentation.bodyPixMaskValueToRainbowColor,
            { r: 255, g: 255, b: 255, a: 255 }
          );
          const opacity = 0.5;
          const flipHorizontal = false;
          const maskBlurAmount = 0;
          bodySegmentation.drawMask(
            canvas,
            video,
            coloredPartImage,
            opacity,
            maskBlurAmount,
            flipHorizontal
          );
          requestAnimationFrame(detectBody);
        }

        detectBody();
      };
    }

    setupModal();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width="640"
            height="480"
          />
          <canvas ref={canvasRef} width="640" height="480" />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="border p-2 shadow-md rounded-md"
            onClick={async () => {
              if (baseModel && model) {
                const video = videoRef.current!;
                let pixel = tf.browser
                  .fromPixels(video, 3)
                  .resizeNearestNeighbor([224, 224])
                  .expandDims(0);
                const baseModelPred = baseModel.predict(pixel);
                const pred = model.predict(baseModelPred) as tf.Tensor;
                const bmi = ((await pred.array()) as number[][])[0][0] - 8;

                if (bmi < 18.5) {
                  setWeightStatus("Kurus");
                  navigate.push('/kurus');
                } else if (18.5 >= bmi && bmi < 25) {
                  setWeightStatus("Normal");
                  navigate.push('/normal');
                } else if (25 >= bmi && bmi < 30) {
                  setWeightStatus("Gemuk");
                  navigate.push('/gemuk');
                } else if (30 >= bmi && bmi < 35) {
                  setWeightStatus("Obesitas! Tolong kontak para ahli!");
                }

                toast.success("Successfully Classify Image");

                const canvas = canvasRef.current;
                const a = document.createElement("a");
                a.href = canvas!.toDataURL();
                const image = canvas!.toDataURL();
                let file = dataURItoBlob(image);
                a.download = ${Date.now().toString()}${user?.name}.png;
                const form = new FormData();
                form.append("image", file);
                toast.promise(
                  apiMock.post("/image/upload", form, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }),
                  {
                    ...DEFAULT_TOAST_MESSAGE,
                    success: "Successfully Upload Image",
                  }
                );
                a.click();
              }
            }}
          >
            {loading ? "Loading" : "Capture and Classify"}
          </button>
        </div>
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          {weightStatus ? weightStatus : "Click button to classify"}
        </h2>

        {/* <div className='absolute w-full bg-black opacity-80 h-full overflow-hidden'>
        <div className='flex flex-col items-center justify-center h-full'>
          <p className='text-white text-2xl'>Please stand in front of the camera</p>
          <p className='text-white text-2xl'>and make sure your body is visible</p>
        </div>
      </div> */}
      </div>
      <div ref={ref} />
    </Layout>
  );
}
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

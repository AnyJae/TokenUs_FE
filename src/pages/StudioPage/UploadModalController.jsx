import { useEffect, useState } from "react";
import UploadVideoModal1 from "../../components/Modal/UploadVideo/UploadVideoModal1";
import UploadVideoModal2 from "../../components/Modal/UploadVideo/UploadVideoModal2";

function UploadModalController({ onClose }) {

  //사용자 입력 데이터 - 비디오 정보
  const [videoData, setVideoData] = useState({
    title: "",
    detail: "",
    fileUrl: "",
    isOpen: true,
    thumbnailUrl: "",
  });

    //사용자 입력 데이터 - NFT 정보
    const [nftData, setNftData] = useState({
      metadataUri: "",
      totalSupply: "1",
      nftName: "",
      nftSymbol: "",
    });


  //비디오 업르드 단계(1: 기본 정보 및 유사도 검사, 2: NFT 발행)
  const [step, setStep] = useState(1);

  //다음 페이지로 넘어가기
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  //이전 페이지로 돌아가기
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  //사용자 입력 데이터(비디오 정보) 변경
  const handleChangeVideoInfo = (e) => {
    const { name, type, value, files } = e.target;
  
    let finalValue = value;
  
    if (type === "file") {
      finalValue = files[0];
    }
  
    if (name === "isOpen") {
      finalValue = value === "true";
    }
  
    setVideoData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));

  };
  

  //사용자 입력 데이터(NFT 정보) 변경
  const handleChangeNFTInfo = (e) => {
    const {name, type, value, files} = e.target;
    setNftData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  //비디오 업로드 완료
  const handleSubmit = () =>{
    //백엔드 연동 코드 - 비디오 정보/NFT 정보 전달

    onClose();  //모달 창 닫기
  }

//temp for test
  useEffect(() => {
    console.log("videoData 변경:", videoData);
  }, [videoData]);

  return (
    <>
      {step === 1 && (
        <UploadVideoModal1 onCancel={onClose} onNext={handleNext} onChange={handleChangeVideoInfo} data={videoData}/>
      )}
      {step === 2 && (
        <UploadVideoModal2
        onBack={handleBack}
        onSubmit={handleSubmit}
        onChange={handleChangeNFTInfo}
        data={nftData}
        setNftData={setNftData}
      />
      
      )}
    </>
  );
}

export default UploadModalController;
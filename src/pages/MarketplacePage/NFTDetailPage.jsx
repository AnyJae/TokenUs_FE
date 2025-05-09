import styled from "styled-components";
import NFTDesc from "../../components/VideoContent/NFTInfo/NFTDesc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button3 from "../../components/Button/Button3";
import defaultThumbnail from "../../assets/default-thumbnail.png";
import Button4 from "../../components/Button/Button4";
import PlusHeart from "../../assets/Vector (3).png";
import CardIcon from "../../assets/Vector (4).png";
import NFTHistory from "../../components/VideoContent/NFTInfo/NFTHistory";
import { useEffect, useState } from "react";
import { getVideoDetail } from "../../services/videoService";
import { getUserDetail } from "../../services/channelService";
import { getListedNFT, getTxHistory } from "../../services/NFTService";
import HistoryChart from "../../components/VideoContent/NFTInfo/HistoryChart";
import NFTTradeModal from "./NFTTradeModal";

const txHistoryTemp = [
  { txHash: "0x1", tradePrice: 1.25, createdAt: "2024-05-01T10:00:00Z" },
  { txHash: "0x2", tradePrice: 2.1, createdAt: "2024-05-02T11:30:00Z" },
  { txHash: "0x3", tradePrice: 0.75, createdAt: "2024-05-03T13:45:00Z" },
  { txHash: "0x4", tradePrice: 1.9, createdAt: "2024-05-04T15:00:00Z" },
  { txHash: "0x5", tradePrice: 3.05, createdAt: "2024-05-05T09:20:00Z" },
  { txHash: "0x6", tradePrice: 2.55, createdAt: "2024-05-06T16:10:00Z" },
  { txHash: "0x7", tradePrice: 4.0, createdAt: "2024-05-07T12:00:00Z" },
  { txHash: "0x8", tradePrice: 1.75, createdAt: "2024-05-08T18:30:00Z" },
  { txHash: "0x9", tradePrice: 3.6, createdAt: "2024-05-09T14:45:00Z" },
  { txHash: "0x10", tradePrice: 2.85, createdAt: "2024-05-10T17:15:00Z" },
];

//NFT 상세 페이지
function NFTDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { videoId, creatorId } = location.state || {};

  const [videoInfo, setVideoInfo] = useState("");
  const [creator, setCreator] = useState("");
  const [txHistory, setTxHistory] = useState();
  const [listedNFT, setListedNFT] = useState();

  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false); //NFT 구매 모달 실행 여부

  //페이지 렌더링 데이터 가져오기
  const fetchData = async () => {
    const videoData = await getVideoDetail(videoId);
    setVideoInfo(videoData);
    const creatorData = await getUserDetail(creatorId);
    setCreator(creatorData);
    const txData = await getTxHistory(videoId);
    setTxHistory(txData);
    let nftData = await getListedNFT(videoId);
    console.log("Listed NFTs 1: ", nftData);
    nftData = nftData.sort(
      (a, b) => parseFloat(a.currentPrice) - parseFloat(b.currentPrice)
    ); //가격 기준 오름차순 정렬

    setListedNFT(nftData);
    console.log("Listed NFTs 2: ", nftData);
  };

  //NFT 구매 모달 창 열고 닫기
  const openTradeModal = () => setIsTradeModalOpen(true);
  const closeTradeModal = () => setIsTradeModalOpen(false);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log("데이터 로드 실패: ", error);
    }
  }, []);

  return (
    <>
      <Wrapper>
        <VideoSection>
          <ImgBox>
            <Link
              to={`/watch/${encodeURIComponent(videoInfo.videoTitle)}`}
              state={{
                videoId: videoId,
                creatorId: creatorId,
              }}
            >
              {/* <Thumbnail2 img={videoInfo.thumbnailUrl || defaultThumbnail} /> */}
              <Thumbnail src={videoInfo.thumbnailUrl} />
            </Link>
          </ImgBox>
          <VideoInfo>
            <StyledNFTDesc
              title={videoInfo.videoTitle}
              description={videoInfo.videoDetail}
              creator={creator.nickName}
              mintPrice={videoInfo.mintPrice}
              floorPrice={videoInfo.floorPrice}
              profile={creator.profileImageUrl}
            />
            <Buttons>
              <StyledButton4 width="48%" height="50px" fontSize="15px">
                관심 등록 &nbsp; <img src={PlusHeart} width={15} />
              </StyledButton4>
              <StyledButton3
                onClick={openTradeModal}
                width="48%"
                height="50px"
                fontSize="15px"
              >
                구매하기 &nbsp; <img src={CardIcon} width={17} />
              </StyledButton3>
            </Buttons>
          </VideoInfo>
        </VideoSection>
        <NFTSection>
          <TransactionInfo>
            <StyledNFTHistory history={txHistory} />
          </TransactionInfo>
          <TransactionInfo2>
            {txHistoryTemp && txHistoryTemp.length > 0 ? (
              <HistoryChart history={txHistoryTemp} />
            ) : (
              <></>
            )}

            <ListedNFTs></ListedNFTs>
          </TransactionInfo2>
        </NFTSection>
      </Wrapper>

      {/*NFT 구매 모달*/}
      {isTradeModalOpen && (
        <NFTTradeModal onClose={closeTradeModal} listedNFT={listedNFT} />
      )}
    </>
  );
}

const Wrapper = styled.div`
  padding: 15px 5%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const VideoSection = styled.div`
  padding: 0 5%;
  display: flex;
  gap: 20px;
`;

const ImgBox = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const Thumbnail2 = styled.div`
  width: 100%;
  position: relative;
  background-color: gray;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); // 처음엔 투명
    transition: background-color 0.3s ease;
    border-radius: 5px;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.3); // hover 시 어둡게
  }
`;

const Thumbnail = styled.img`
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 5px;
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const VideoInfo = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledNFTDesc = styled(NFTDesc)`
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgb(0, 0, 0, 0.05);
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton4 = styled(Button4)`
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgb(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
`;

const StyledButton3 = styled(Button3)`
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgb(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
`;

const NFTSection = styled.div`
  padding: 0 5%;
  display: flex;
  gap: 20px;
`;

const TransactionInfo = styled.div`
  flex: 2;
`;
const TransactionInfo2 = styled.div`
  flex: 3;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledNFTHistory = styled(NFTHistory)`
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgb(0, 0, 0, 0.05);
`;

const ListedNFTs = styled.div``;

export default NFTDetailPage;

import { useEffect, useState } from "react";
import styled from "styled-components";
import { getNFTList } from "../../services/NFTService";
import VideoCard from "../../components/VideoContent/VideoCard";
import { getVideoDetail, getVideoList } from "../../services/videoService";
import { getMyInfo, getUserDetail } from "../../services/channelService";
import { GRAY_SCALE, TEXT } from "../../constants/colors";
import { weiToMatic } from "../../utils/blockchainNetwork";
import SortBar2 from "../../components/VideoContent/SortBar2";
import NFTCard from "../../components/VideoContent/NFTInfo/NFTCard";
import { Link } from "react-router-dom";

//NFT 마켓플레이스
function MarketplacePage() {

  const [NFTs, setNFTs] = useState([]);
  const [videoData, setVideoData] = useState("");

  //NFT 목록 정렬 함수
  const sortNFT = async (criterion) => {
    try {
        const data = await getNFTList(criterion);
        setNFTs(data);
    } catch (error) {
      console.error("정렬된 NFT 목록 불러오기 실패:", error);
    } 
  };

  //NFT 목록 불러오기
  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const data = await getNFTList();
        setNFTs(data);
        console.log("NFT 목록: ", data);
      } catch (error) {
        console.error("NFT 목록 불러오기 실패:", error);
      }
    };
    loadNFTs();
  }, []);

  return (
    <>
      <Wrapper>
        <TempTitle>NFT 마켓플레이스</TempTitle>
        <SortBar2 sortNFT={sortNFT}/>
        <NFTListWrapper>
          {NFTs && NFTs.map((nft, index) => (
            <Link key={index} 
            to={`/nft-info/${encodeURIComponent(nft.tokenId)}`}
            style={{ textDecoration: "none", color: "inherit" }}
            state={{videoId: nft.videoId, creatorId: nft.creatorId}}
            >
              
              <StyledNFTCard
                title={nft.nftName}
                videoId={nft.videoId}
                creatorId={nft.creatorId}
                price={nft.currentPrice}
              />
            </Link>
          ))}
        </NFTListWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 50px 10% 0 10%;
  display: flex;
  flex-direction: column;
`;

const TempTitle = styled.div`
  padding: 30px 0;
  font-size: 25px;
  font-weight: 600;
`;

const NFTListWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 25px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const StyledNFTCard = styled(NFTCard)`
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.03), 0 -2px 5px rgba(0, 0, 0, 0.03),
    2px 0 5px rgba(0, 0, 0, 0.03), -2px 0 5px rgba(0, 0, 0, 0.03);
`;

export default MarketplacePage;

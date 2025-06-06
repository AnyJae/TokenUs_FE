import styled from "styled-components";
import { MAIN, GRAY_SCALE, TEXT } from "../../../constants/colors";
import Button2 from "../../Button/Button2";
import { weiToMatic } from "../../../utils/blockchainNetwork";
import { useNavigate } from "react-router-dom";

function NFTPrice({price, title, videoId, creatorId, className}) {
  const navigate = useNavigate();
  //matic 단위 변환
  const floorPriceMatic = Number(weiToMatic(price)).toFixed(3);
  //NFT 상세 페이지로 이동
  const moveToNFTDetail = () => {
    navigate(`/nft-info/${encodeURIComponent(title)}`,{
      state:{
        videoId,
        creatorId,
      }
    });
  }
  return (
    <>
      <Wrapper className={className}>
        <Title>NFT Price</Title>
        <ContentWrapper>
          <PriceInfo>
            <Subtitle>Floor Price</Subtitle>
            <Price>{floorPriceMatic} MATIC</Price>
          </PriceInfo>
          <ButtonWrapper>
            <Button2 onClick={moveToNFTDetail} width="150px" height="40px"  fontSize={"18px"}>
              구매하기
            </Button2>
          </ButtonWrapper>
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid ${GRAY_SCALE.GRAY300};
  border-radius: 5px;
  padding: 10px 15px;
`;

const Title = styled.div`
  border-bottom: 1px solid ${GRAY_SCALE.GRAY300};
  color: ${MAIN.BLUE};
  font-size: 18px;
  font-weight: 500;
  padding: 15px 0 15px 10px;
`

const ContentWrapper = styled.div`
  display: flex;
  padding: 15px 10px;
  justify-content: space-between;
`

const PriceInfo = styled.div`
display: flex;
flex-direction: column;
gap:5px;
`;

const Subtitle = styled.div`
  color:${TEXT.GRAY};
  font-size: 13px;
`;

const Price = styled.div`
font-weight: 550;
font-size: 22px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: end;
`;

export default NFTPrice;

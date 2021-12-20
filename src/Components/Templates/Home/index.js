// Dependencies
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Atoms
import Button from "Components/Atoms/Button";
import Textarea from "Components/Atoms/Textarea";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Styles
import * as S from "./style";

// Template
const HomeTemplate = () => {
  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Home</title>
      </Head>

      <S.HomeWrapper>
        <S.FeedWrapper>
          <S.NewFeedItem>
            <Textarea
              id='new-feed-item'
              size={120}
              placeholder='Faça uma nova publicação'
            />
          </S.NewFeedItem>

          <S.FeedItem>
            <S.FeedItemHeader>
              <div>
                <Link href='#'>
                  <a>
                    <InfoArea
                      side='left'
                      info={{
                        name: "Yogg'Sara",
                        url: "yogg-sara",
                        avatar: `http://pm1.narvii.com/6280/2d5ef40edeab7884d64508563b7cb0d5b6321595_00.jpg`,
                      }}
                    />
                  </a>
                </Link>
              </div>

              <Button style='transparent' size={16}>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Button>
            </S.FeedItemHeader>

            <S.FeedItemTime>1 hora atrás</S.FeedItemTime>

            <S.FeedItemContent>
              <img
                src={`https://i.pinimg.com/originals/bc/7f/ff/bc7fff0f4fec8297bf46ae5fb5c52f9f.jpg`}
              />
            </S.FeedItemContent>

            <div>1289 curtidas - 156 comentários</div>
          </S.FeedItem>
        </S.FeedWrapper>

        <S.Idk />
      </S.HomeWrapper>
    </AuthedTemplate>
  );
};

export default HomeTemplate;

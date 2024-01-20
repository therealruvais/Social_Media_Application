import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";

const ShareModel = ({ shareUrl }) => {
  return (
    <div className="share-modal">
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon
          size={32}
          round
        />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl}>
        <TwitterIcon
          size={32}
          round
        />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon
          size={32}
          round
        />
      </WhatsappShareButton>

      <TelegramShareButton url={shareUrl}>
        <TelegramIcon
          size={32}
          round
        />
      </TelegramShareButton>

      <EmailShareButton url={shareUrl}>
        <EmailIcon
          size={32}
          round
        />
      </EmailShareButton>
    </div>
  );
};

export default ShareModel
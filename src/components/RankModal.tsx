import {useRouter} from 'next/router';
import React, {useState} from 'react';
import storeRank from '../container/storeRank';
import ImgButton from './ImgButton';
import LoadingProgress from './LoadingProgress';
import Modal from './Modal';
import ResultModal from './ResultModal';

interface Props {
  isVisible: boolean;
  setVisible: (arg: boolean) => void;
  score: number;
}

const RankModal: React.FC<Props> = ({isVisible, score, setVisible}) => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultTitle, setResultTitle] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <LoadingProgress isVisible={isLoading} />
      <ResultModal
        isVisible={showResult}
        title={resultTitle}
        message={resultMessage}
        onClose={() => {
          setShowResult(false);
          router.replace('/rank');
        }}
      />
      <Modal isVisible={isVisible}>
        <div className="modalBody">
          <header>
            <h2>Store Rank</h2>
          </header>
          <section>
            <div>Input your nickname.</div>
            <form onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                maxLength={10}
                placeholder="Nickname"
                value={nickname}
                onChange={handleNickName}
              />
              <ImgButton
                text="Rank"
                img="/medal.svg"
                onClickHandler={async () => {
                  if (!nickname) {
                    setResultTitle('Input Required');
                    setResultMessage('Please input your nickname.');
                    setShowResult(true);
                    return;
                  }

                  setIsLoading(true);
                  try {
                    const result = await storeRank({score, nickname});
                    setIsLoading(false);

                    if (result.updated) {
                      setResultTitle('🎉 Success!');
                      setResultMessage(result.message || 'New high score!');
                    } else {
                      setResultTitle('Already Recorded');
                      setResultMessage(
                        `Your score: ${score.toLocaleString()}\n` +
                        `Best score: ${result.existingScore?.toLocaleString()}\n\n` +
                        `Only your highest score is saved!`
                      );
                    }
                    setShowResult(true);
                  } catch (error) {
                    setIsLoading(false);
                    setResultTitle('Error');
                    setResultMessage('Failed to save rank.\nPlease try again.');
                    setShowResult(true);
                  }
                }}
              />
              <ImgButton
                text="Close"
                img="/exit.svg"
                onClickHandler={() => {
                  setNickname('');
                  setVisible(false);
                }}
              />
            </form>
          </section>
        </div>
        <style jsx>{`
          .modalBody {
            width: 90%;
            max-width: 350px;
            padding: 0 0 20px 0px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 1rem;
            overflow: hidden;
            animation: modal-show 0.3s;
          }
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          form input {
            padding: 10px;
            margin: 10px;
            font-size: 18px;
          }
        `}</style>
      </Modal>
    </>
  );
};

export default RankModal;

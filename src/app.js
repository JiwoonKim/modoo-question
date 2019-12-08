import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserProvider, SpeakerProvider, QuestionProvider, RankingProvider } from './contexts';
import Enter from './pages/Enter';
import Main from './pages/Main';

export default function App() {
  
  // Default Contexts 정의
  // TODO: 예시 빼고 INITAL FORM으로 바꾸기
  const [id, setId] = useState(/*0*/41);
  const [room, setRoom] = useState({
    /*
    seminarId: null,
    seminarTitle: null,
    */
    seminarId: 39,
    seminarTitle: "디프만 외부 세미나",
  });

  const [speakers, setSpeakers] = useState(/*[]*/
    [
      {
        speakerId: 41,
        speakerName: '디프마니',
        speakerTopic: '디프만의 시작',
        organization: '디프만',
      },
      {
        speakerId: 42,
        speakerName: '라이언',
        speakerTopic: '백수의 왕이 되는 방법',
        organization: 'Pride Land',
      },
      {
        speakerId: 43,
        speakerName: '니니즈',
        speakerTopic: '인기 이모티콘이 되기까지의 여정',
        organization: '카카오',
      },
    ]
  );

  /* 성능 개선점: 배열이 아닌 object (또는 dict) 형태로 바꾸기
     option 1: 백엔드로부터 받을 때 object로 받음
               -> 최초 질문 리스트 업데이트 O(1), like 업데이트 O(1)
     option 2: 백엔드로부터 array로 받되 최초 업데이트 시 object로 형태 변형하여 저장
               -> 최초 질문 리스트 업데이트 O(n), like 업데이트 O(1)
  */
  const [questionsForSpeakers, setQuestionsForSpeakers] = useState({
    /*{}*/
    "1": [
      {
        commentId: 1,
        content: "질문 있어요! (to. 디프마니 님)",
        likeCount: 5,
      },
      {
        commentId: 2,
        content: "두 번째 질문! (to. 디프마니 님)",
        likeCount: 10,
      }
    ],
    "2": [
      {
        commentId: 1,
        content: "질문! (to. 라이언 님)",
        likeCount: 15,
      },
      {
        commentId: 2,
        content: "두 번째 질문! (to. 라이언 님)",
        likeCount: 20,
      }
    ],
    "3": [],
  });

  const [rankingsPerSpeakers, setRankingsPerSpeakers] = useState(/*{}*/{
    "1": [
      {
        commentId: 1,
        content: "랭킹이 제일 높은 질문! (to. 디프마니 님)",
        likeCount: 50,
      },
      {
        commentId: 2,
        content: "랭킹이 두 번째로 높은 질문! (to. 디프마니 님)",
        likeCount: 10,
      }
    ],
    "2": [
      {
        commentId: 1,
        content: "랭킹이 제일 높은 질문! (to. 라이언 님)",
        likeCount: 60,
      },
      {
        commentId: 2,
        content: "랭킹이 두 번째로 높은 질문! (to. 라이언 님)",
        likeCount: 20,
      }
    ],
    "3": [],
  });

  const userContext = {
    userId: id,
    setUserId: (idNum) => { setId(idNum) },
    seminarRoom: room,
    setSeminarRoom: (roomInfo) => { setRoom(roomInfo) },
  };

  const speakerContext = {
    speakers: speakers,
    setSpeakers: (speakerList) => { setSpeakers(speakerList) },
    addNewSpeaker: (speaker) => { setSpeakers(prev => [...prev, speaker] ) },
  };

  const questionContext = {
    questions: questionsForSpeakers,
    setQuestions: (questionMap) => { 
      setQuestionsForSpeakers(questionMap) 
    },
    addNewQuestion: (speaker, question) => { 
      setQuestionsForSpeakers(prev => ({
        ...prev, 
        [speaker.speakerId]: [...prev[speaker.speakerId], question],
      }));
    },
    // TODO: question보다 question.id만 받아서 사용할 수 있는지
    deleteQuestion: (speaker, question) => { 
      setQuestionsForSpeakers(prev => ({
        ...prev,
        [speaker.speakerId]: prev[speaker.speakerId].filter(q => 
          q.commentId !== question.commentId
        ),
      }));
    },
    // TODO: question보다 question.id만 받아서 사용할 수 있는지
    updateLikeCount: (speaker, question, likeCount) => {
      setQuestionsForSpeakers(prev => ({
        ...prev,
        [speaker.speakerId]: prev[speaker.speakerId].map(q => {
          if (q.commentId === question.commentId) {
            return ({
              ...q,
              likeCount: likeCount,
            });
          }
          return q;
        }),
      }));
    }
  };

  const rankingContext = {
    rankings: rankingsPerSpeakers,
    setRankings: (rankingMap) => { setRankingsPerSpeakers(rankingMap) },
    updateRankingsOfSpeaker: (speaker, rankingsList) => {
      setRankingsPerSpeakers(prev => ({
        ...prev,
        [speaker.speakerId]: rankingsList,
      }))
    }
  };

  return (
    <UserProvider value={userContext}>
      <SpeakerProvider value={speakerContext}>
        <QuestionProvider value={questionContext}>
          <RankingProvider value={rankingContext}>
            <BrowserRouter>
              <Switch>
                <Route exact path='/' component={Enter} />
                <Route exact path='/:roomId' component={Main} />
              </Switch>
            </BrowserRouter>
          </RankingProvider>
        </QuestionProvider>
      </SpeakerProvider>
    </UserProvider>
  );
};
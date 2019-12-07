import { useContext } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { API_ROOT } from './api';
import { QuestionContext, RankingContext } from '../contexts';

// Socket Configurations
export const STOMP_ENDPOINT = '/q-rank-websock';
export const DESTINATION_PREFIX = '/app';
export const SIMPLE_BROKER = '/subscribe';

export let stompClient = null;

export function connectWebSockets(seminarId) {
  const socket = new SockJS(`${API_ROOT}/${STOMP_ENDPOINT}`);
  stompClient = Stomp.over(socket);

  stompClient.connect({}, 
    // successful connection: subscribe to topic
    () => {    
      stompClient.subscribe(`${SIMPLE_BROKER}/seminar/${seminarId}`, (res) => {
        const data = JSON.parse(res.body);
        console.log(data);
        //receiveBroadcasting(data);
    })},
    // unsuccessful connection
    (error) => {
      return error;
    }
  );
};

/*
export function receiveBroadcasting(data) {
  const { addNewQuestion, updateLikeCount, deleteQuestion } = useContext(QuestionContext);
  const { setRankings } = useContext(RankingContext);

  if (data.type === 'comment') {
    addNewQuestion(speaker, question);
  }
  if (data.type === 'like' || data.type === 'unlike') {
    updateLikeCount(speaker, question, likeCount);
  }
  if (data.type === 'ranking') {
    setRankings(speaker, rankings);
  }
  if (data.type === 'delete') {
    deleteQuestions(speaker, question);
  }
};
*/

export function postQuestion(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}`, {}, question);
};

export function updateLike(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}/like`, {}, question);
};

export function updateUnlike(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}/unlike`, {}, question);
};

export function deleteQuestion(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}/delete`, {}, question);
};


import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { managerMeeting } from "../interfaces/managerDictionary.interfaces";
import { useFetch } from '../hooks/useApi';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type managerDictionaryContext = {
  dictionary: managerMeeting[];
  addMeeting: (newMeeting: managerMeeting) => Promise<void>;
  updateMeeting: (updatedMeeting: managerMeeting) => Promise<void>;
  deleteMeeting: (meetingId: string) => Promise<void>;
};

const InitialDictionaryContext: managerDictionaryContext = {
  dictionary: [],
  addMeeting: async () => { },
  updateMeeting: async () => { },
  deleteMeeting: async () => { }
};

// interface DeleteMeetingResponse {
//   success: boolean;
// }

export const DictionaryContext = createContext<managerDictionaryContext>(InitialDictionaryContext);

export const DictionaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dictionary, setDictionary] = useState<managerMeeting[]>([]);
  const { data: getDictionaryData, error: getDictionaryError, fetchData: fetchDictionary } = useFetch();
  const { data: postDictionaryData, error: postDictionaryError, fetchData: postMeeting } = useFetch();
  const { data: updateDictionaryData, error: updateDictionaryError, fetchData: updateMeetingFetch } = useFetch();
  const { data: deleteDictionaryData, error: deleteDictionaryError, fetchData: deleteMeetingFetch } = useFetch();

  // Fetch initial data on component mount
  useEffect(() => {
    fetchDictionary('/meetings');
  }, [fetchDictionary]);

  // Update dictionary when getDictionaryData changes
  useEffect(() => {
    if (getDictionaryData) {
      setDictionary(getDictionaryData);
      console.log('Meetings', getDictionaryData);
    } else if (getDictionaryError) {
      console.log('Error fetching meetings:', getDictionaryError);
    } else {
      console.log('Meetings not found!');
    }
  }, [getDictionaryData, getDictionaryError]);

  const addMeeting = async (newMeeting: managerMeeting) => {
    try {
      const addedMeeting = await postMeeting('/meetings', 'POST', newMeeting);
      if (addedMeeting) {
        setDictionary([...dictionary, addedMeeting]);
      } else if (postDictionaryError) {
        console.log('Error in adding meeting:', postDictionaryError);
      }
    } catch (error) {
      console.log('Error in adding meeting:', error);
    }
  };

  const updateMeeting = async (updatedMeeting: managerMeeting) => {
    try {
      const response = await updateMeetingFetch(`/meetings/${updatedMeeting._id}`, 'PUT', updatedMeeting);
      console.log("response updating data", response);
      if (response) {
        setDictionary(prevDictionary =>
          prevDictionary.map(meeting =>
            meeting._id === updatedMeeting._id ? response : meeting
          )
        );
        console.log(response);
      }
      else if (updateDictionaryError) {
        console.log('Error in updating meeting:', updateDictionaryError);
      }
    } catch (error) {
      console.log('Error in updating meeting:', error);
    }
  };

  const deleteMeeting = async (meetingId: string) => {
    try {
      const response = await deleteMeetingFetch(`/meetings/${meetingId}`, 'DELETE', meetingId);
      if (response) {
        setDictionary(dictionary.filter(meeting => meeting._id !== meetingId));
      }
    } catch (error) {
      console.log('Error in deleting meeting:', error);
      if (deleteDictionaryError) {
        console.log('Error in deleting meeting:', deleteDictionaryError);
      }
    }
  };

  return (
    <DictionaryContext.Provider value={{ dictionary, addMeeting, updateMeeting, deleteMeeting }}>
      {children}
    </DictionaryContext.Provider>
  );
};

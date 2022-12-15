import { FC, useState, useEffect } from 'react';
import { Container, ErrorMessage, Wrapper } from './App.styles';
import Table from '../Table/Table';
import { Document } from '../../types/document';
import { getDocumentsOne, getDocumentsTwo } from '../../service/api';
import Loader from '../shared/Loader/Loader';

const App: FC = () => {
  const [data, setData] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // запускаем параллельное выполнение промисов, чтобы запросы не ждали друг друга
    const fetchDocuments = async () => {
      Promise.all([getDocumentsOne(), getDocumentsTwo()])
        .then((response) =>
          response.forEach((documents) => setData((state) => [...state, ...documents]))
        )
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    };

    fetchDocuments();
  }, []);
  if (error)
    return (
      <Container>
        <ErrorMessage>Что то пошло не так. Перезагрузите страницу</ErrorMessage>
      </Container>
    );

  return (
    <Wrapper>
      <Container>{loading ? <Loader /> : <Table rows={data} />}</Container>
    </Wrapper>
  );
};

export default App;

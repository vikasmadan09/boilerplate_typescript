import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { clearData } from 'src/redux/getUsers.slice';
import { sagaActions } from '../sagaActions';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  width: 300px;
  margin-top: 30px;
`;

const Name = styled.div`
  word-break: break-word;
  padding-left: 10px;
`;

interface IName {
  first: string;
  last: string;
}

interface IUser {
  name: IName;
  [key: string]: any;
}
const Home = () => {
  const dispath = useDispatch();
  const users = useSelector((state: any) => state.users);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!users?.data?.results?.length) {
      dispath({ type: sagaActions.FETCH_DATA_SAGA });
    }
    return () => {
      dispath(clearData());
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredData(users?.data?.results);
  }, [users.data]);

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    const filteredData = users.data?.results.filter((item: any) => {
      const fullName = `${item.name.first} ${item.name.last}`;
      if (fullName.toLowerCase().includes(value)) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  return (
    <Container>
      <div>Home page</div>
      <input type="text" placeholder="Search" onChange={handleChange} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredData?.map((user: IUser) => {
          const fullName = `${user.name.first} ${user.name.last}`;
          return (
            <Content key={user.email}>
              <div style={{ display: 'flex', alignItems: 'center', margin: '0 50px' }}>
                <div>
                  <img src={user.picture.thumbnail} style={{ borderRadius: '50%' }} />
                </div>
                <Name>{fullName}</Name>
              </div>
            </Content>
          );
        })}
      </div>
    </Container>
  );
};

export default Home;

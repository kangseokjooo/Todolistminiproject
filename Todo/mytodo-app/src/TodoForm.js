import { useState, useRef,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'
const _FatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: antiquewhite;
`;
const _MainH1=styled.h1`
  font-weight: 900;
  color: darkblue;
`;
const _FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;
  width: 60%;
  background-color: wheat;
  border-radius: 10%;
  overflow-y: scroll;
`;
const _Listdiv=styled.div`
  margin-top: 5px;
`
const _AddInput=styled.input`
    padding: 10px 10px;
    margin-right: 10px;

`
const _Button=styled.button`
  padding: 10px 10px;
  margin-right: 10px;  
  background-color: whitesmoke;
  border: none;
  border-radius: 10px;
  &:hover{
    background-color: bisque;
  }
`
const _EditInput=styled.input`
  padding: 5px 5px;
  margin: 0px 5px;
`;
export default function TodoForm() {
  // const serverUrl=
  const titleRef = useRef();
  const [title, setTitle] = useState('');
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const serverUrl='http://localhost:8000'
  useEffect(()=>{
    async function todoGet(){
      try {
        const res=await axios({
          method:'GET',
          url:`${serverUrl}/todos`
        })
        if(res.data.result){
          console.log(res.data.message)
        }
      } catch (error) {
        console.log(error)
      }
      
    }
    todoGet();
  },[])

  const handleTodo = async(e) => {
    e.preventDefault();
    if (title !== '') {
      const newTodo={title,done:false}
      const res=await axios({
        method:'POST',
        url:`${serverUrl}/todo`,
        data:newTodo
      })
      if(res.data.result){
        setList([...list, res.data.data]);

      }
      setTitle('');
    } else {
      titleRef.current.focus();
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedList = [...list];
    updatedList[index].checked = !updatedList[index].checked;
    setList(updatedList);
  };

  const handleDelete =async (index) => {
    const todoId=list[index].id
    const res=await axios({
      method:'DELETE',
      url:`${serverUrl}/todo/${todoId}`,
    })
    if(res.data.result){
      const updatedList = list.filter((_, idx) => idx !== index);
      setList(updatedList);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleEditChange =async (e, index) => {
    const todoId=list[index].id
    const editTitle=e.target.value
    const data={title:editTitle}
    const res=await axios({
      method:'PATCH',
      url:`${serverUrl}/todo/${todoId}`,
      data
    })
    if(res.data.result){
      const updatedList = [...list];
      updatedList[index].title = editTitle;
      setList(updatedList);
    }
  };

  const handleBlur = () => {
    setEditIndex(null);
  };

  return (
    <_FatherContainer>
      <_FormContainer>
        <_MainH1>Kang's Todo</_MainH1>
      <form onSubmit={handleTodo}>
        <_AddInput ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} />
        <_Button type="submit">ADD</_Button>
      </form>
      <div>
        {list.map((item, idx) => (
          <_Listdiv key={idx}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(idx)}
            />
            {editIndex === idx ? (
              <_EditInput
                type="text"
                value={item.title}
                onChange={(e) => handleEditChange(e, idx)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <span>{item.title}</span>
            )}
            <_Button onClick={() => handleDelete(idx)}>삭제</_Button>
            <_Button onClick={() => handleEdit(idx)}>수정</_Button>
          </_Listdiv>
        ))}
      </div>
      </_FormContainer>
    </_FatherContainer>
  );
}

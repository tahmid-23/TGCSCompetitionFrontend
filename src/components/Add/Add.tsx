import { FormEvent } from 'react';
import { IP_ADDRESS } from '../../Global';
import AddForm from '../Forms/AddForm';

function getValue(event: FormEvent<HTMLFormElement>, id: string): any {
  const value = event.currentTarget[id].value;
  if (value === '') {
    return null;
  }

  return value;
}

function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = {
    website_url: getValue(event, 'url'),
    entry_fee: getValue(event, 'fee'),
    participant_count: '1-10', //getValue(event, 'participant_count'),
    name: getValue(event, 'name'),
    origin_year: getValue(event, 'origin_year'),
    purpose: getValue(event, 'purpose'),
    description: getValue(event, 'description'),
    required_items: getValue(event, 'required_items'),
    advice: getValue(event, 'advice'),
    score_time: getValue(event, 'time_score'),
    score_difficulty: getValue(event, 'difficulty_score'),
    score_benefit: getValue(event, 'benefit_score'),
    score_mgmt: getValue(event, 'management_score'),
    type: 'COMPETITION', //pls fix
    virtual: getValue(event, 'virtual'),
    address: getValue(event, 'address'),
    start_date: getValue(event, 'start_date'),
    end_date: getValue(event, 'end_date'),
    application_due_date: getValue(event, 'due_date'),
    prerequisite_description: getValue(event, 'prerequisite_description'),
    entry_description: getValue(event, 'entry_description')
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tableName: 'experience', data: data })
  };
  fetch(`${IP_ADDRESS}/insert`, requestOptions).then((res) => {
    if (res.status === 400) {
      alert('Something went wrong!');
    } else if (res.status === 200 || res.status === 204) {
      alert('Success!');
    } else {
      alert('We have no idea what went wrong\n But its not error 400.');
    }
  });
}

const Add = () => {
  return <AddForm onSubmit={onSubmit}></AddForm>;
};

export default Add;

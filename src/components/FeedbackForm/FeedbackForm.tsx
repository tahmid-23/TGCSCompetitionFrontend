import { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { IP_ADDRESS } from '../../Global';

const FeedbackForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const experienceId = searchParams.get('experienceId');
  if (!experienceId) {
    return null;
  }

  const onSubmitFeedback = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const feedbackOptions: RequestInit = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableName: 'feedback',
        data: {
          experience_id: experienceId,
          feedback: e.currentTarget['feedback-form'].value
        }
      })
    };
    fetch(`${IP_ADDRESS}/insert`, feedbackOptions)
      .then((res) => {
        if (res.status === 400) {
          alert('Something went wrong!');
        } else if (res.status === 401) {
          navigate("/login");
        } else if (res.status === 200 || res.status === 204) {
          alert('Success!');
          return res.json();
        } else {
          alert('We have no idea what went wrong\n But its not error 400.');
        }
      })
      .finally(() => {
        navigate(-1);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmitFeedback}>
        <div>
          <label htmlFor="feedback-form">Feedback Form:</label>
        </div>
        <div>
          <textarea
            id="feedback-form"
            rows={4}
            cols={80}
            placeholder="Enter your feedback here..."
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;

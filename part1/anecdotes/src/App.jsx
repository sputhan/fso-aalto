import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Display = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title} </h1>
      {anecdote} <br />
      has {votes} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [maxvoted, setMaxvoted] = useState(0)

  const handleNextClick = () => {
    let index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }

  const handleVoteClick = () => {
    let copy_votes = Array.from(votes)
    copy_votes[selected] = copy_votes[selected] + 1
    setVotes(copy_votes)
    let max_index = copy_votes.indexOf(Math.max(...copy_votes))
    setMaxvoted(max_index)

  }

  return (
    <div>
      <Display title="Anecdote of the Day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleNextClick} text='next anecdote' />
      <Display title="Anecdote with most votes" anecdote={anecdotes[maxvoted]} votes={votes[maxvoted]} />


    </div>
  )
}

export default App
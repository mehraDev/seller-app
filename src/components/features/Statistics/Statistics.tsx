import React from 'react'

type Stats = {
  label: string
  value: number
}

type Props = {
  stats: Stats[]
}

const Statistics: React.FC<Props> = ({stats}) => {
  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        {stats.map((stat) => (
          <li key={stat.label}>
            <strong>{stat.label}:</strong> {stat.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Statistics

/* eslint-disable react/prop-types */
import logo from '../assets/LQ no background-1-2.png'

export default function Logo({ className = '' }) {
  return <img src={logo} alt="PHx Drive" className={`object-contain ${className}`} />
}

import React,{Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect}from 'react-redux'
import *as actions from '../actions'

class Payments extends Component{
    render(){
        return(
            <StripeCheckout 
            //show different moneys like $
            //stripe default using $ cents
                name = "Emaily"//pay to who
                description="$5 for 5 emails"//pay for what
                amount={500}
                //receive a callback func
                token={token=>this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
               <button className = "btn">
                   Add Credits
               </button>
            </StripeCheckout>
        )
    
    }
}
export default connect(null, actions)(Payments)
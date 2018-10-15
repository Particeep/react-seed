import pcHttp from '../core/http'
import {ConsumerKey, IConsumer, mapConsumerFromApi, mapConsumersFromApi} from '../type/consumer'
import {IPagination} from '../type/paginated'
import {IUser, mapUsersFromApi} from '../type/user'
import {UserCriteria} from '../type/criteria/userCriteria'
import {IFundraise, mapFundraisesPaginationFromApi} from '../type/enterprise/fundraise'
import {IContextLoanequity} from '../type/context-loanequity'

const query = `
query Fundraise_search($limit: Int, $offset: Int, $sort_by: String, $order_by: String, $global_search: String, $statuses: String, $fundraise_type: String, $fundraise_id: String, $targeting_roles: String, $created_after: DateTime, $created_before: DateTime, $end_before: DateTime, $end_after: DateTime) {
  fundraise_searchs(fundraise_searchSearchType: {statuses: $statuses, fundraise_type: $fundraise_type, fundraise_id: $fundraise_id, targeting_roles: $targeting_roles}, table_searchSearchType: {limit: $limit, offset: $offset, sort_by: $sort_by, order_by: $order_by, global_search: $global_search}, fundraise_searchSearchForAmountType: {}, fundraise_searchSearchForDateType: {created_after: $created_after, created_before: $created_before, end_before: $end_before, end_after: $end_after}) {
    data {
      ...f8b95cfa2d7ed4a43801c4e70e868a74b
      enterprise {
        ...fe7b0fd3784cb4c3d920e88fd0521d7db
      }
      manager {
        ...f13d7d851f2454859b2ac212660929f36
      }
    }
    total_size
  }
}

fragment f8b95cfa2d7ed4a43801c4e70e868a74b on FundRaiseData {
  id
  created_at
  currency
  name
  end_at
  category
  city
  status
  amount_target
  amount_target_max
  amount_engaged
  transaction_count
  tag
  fundraise_tag
  description_short
  logo_url
  visible
  fundraise_id
  fundraise_type
  private_group_id
  fundraise_loan {
    id
    offer {
      term
      rate
      tax_rate
      step
      amount_min
      amount_max
      bond_price
      method
      repayment_frequency
      repayment_start_date
      deferred_period
    }
  }
  fundraise_equity {
    id
    offer {
      financial_instrument
      fees_in
      fees_in_flat
      fees_out
      tax_rate
      price_per_share
      total_shares
      num_of_shares
      round
      valuation_pre_money
      min_commitment
      max_commitment
    }
  }
  partner_fees {
    flat_fees
    variable_fees
  }
}

fragment fe7b0fd3784cb4c3d920e88fd0521d7db on Enterprise {
  id
  name
  created_at
  activity_domain
  legal_status
  status
  tag
  description_short
  description_long
  url
  logo_url
  image_cover_url
  video_url
  website_url
}

fragment f13d7d851f2454859b2ac212660929f36 on User {
  id
  email
  first_name
  last_name
  avatar_url
  gender
  birthday
  birth_place
  phone
  bio
  address {
    number
    street
    zip
    city
    country
  }
}
`
export const route = {
  consumer: {
    getAll: (): Promise<IConsumer[]> => pcHttp.get(`/app/consumer`).then(mapConsumersFromApi),
    get: (key: ConsumerKey): Promise<IConsumer> => pcHttp.get(`/app/${key}/consumer`).then(mapConsumerFromApi),
  },
}

export const consumerRoute = (key: ConsumerKey) => {
  const base = `/app/${key}`
  return {
    user: {
      search: (c?: UserCriteria): Promise<IPagination<IUser>> => pcHttp.get(`${base}/user/search`, c).then(mapUsersFromApi),
    },
    fundraises: {
      search: (c?: UserCriteria): Promise<IPagination<IFundraise>> => pcHttp.post(`${base}/graphql`, {
        query,
        variables: c
      }).then(x => mapFundraisesPaginationFromApi(x.data.fundraise_searchs)),
    },
    context: {
      getLoanequity: (): Promise<IContextLoanequity> => pcHttp.get(`${base}/context/loan-equity`),
      postLoanequity: (c: IContextLoanequity): Promise<IContextLoanequity> => pcHttp.post(`${base}/context/loan-equity`, c),
    }
  }
}

# Business Flow: Loyalty Redemption

## 1. Purpose

Allow a customer to redeem loyalty points for a reward.

This process begins when a channel makes an API call to the business gateway from `/redeem` prefix endpoint regardless of the version, each version has it's own specification and purpose.

The system must verify eligibility, deduct the required points,
fulfill the reward, refund if the fulfillment failed, and maintain an accurate transaction history.

## 2. Actors

- Channels
- Redemption System
- Eligibility Service
- Point Deduction Service
- Bonus Fulfillment Service
- Notification Service
- Transaction Management Service
- Reporting Service

## 3. Preconditions

Before redemption begins:

- The customer must have a valid service number.
- The requested keyword must exist and active.
- The request must contain a valid customer identifier.
- The requested reward quantity must be valid.
- The system must be able to identify the redemption request uniquely.

Additional eligibility requirements are defined in the
business-rules.md document.

## 4. Main Business Flow

### Step 1: Receive Request

The customer submits a redemption request.

The system validates the request and creates or identifies the
redemption transaction.

Expected outcome:

- A valid request proceeds to eligibility checking.
- An invalid request is rejected with an appropriate error.

### Step 2: Check Eligibility

The Eligibility Service evaluates whether the customer can
redeem the requested reward.

Possible outcomes:

SUCCESS:
Continue to point deduction.

REJECTED:
Mark the redemption as rejected and do not deduct points.

TECHNICAL_FAILURE:
Apply the documented failure-handling policy.

### Step 3: Deduct Points

The Point Deduction Service deducts the required points.

Precondition:
Eligibility must have succeeded.

Possible outcomes:

SUCCESS:
Continue to bonus fulfillment.

INSUFFICIENT_POINTS:
Reject the redemption according to the applicable business rules.

TECHNICAL_FAILURE:
Handle the failure without triggering bonus fulfillment.

### Step 4: Fulfill Bonus

The Bonus Fulfillment Service fulfills the reward.

Precondition:
Point deduction must have succeeded.

Possible outcomes:

SUCCESS:
Record successful fulfillment and continue the transaction lifecycle.

FAILURE:
Apply the documented retry, compensation, or manual-recovery policy.

The compensation policy must be explicitly defined before
implementing automatic point refunds.

### Step 5: Send Notification

The Notification Service sends the appropriate customer notification.

Notification failure must not automatically repeat point deduction
or bonus fulfillment.

### Step 6: Finalize Transaction

The Transaction Management Service records the final business outcome
according to the approved transaction-state model.

The transaction must be traceable throughout its lifecycle.

### Step 7: Reporting

The reporting system receives or queries the appropriate transaction
information.

Reporting failures must not silently corrupt the redemption outcome.

## 5. Business Invariants

The following conditions must always hold:

1. Eligibility must succeed before points are deducted.
2. Point deduction must succeed before bonus fulfillment begins.
3. An ineligible customer must not lose points.
4. A failed point deduction must not trigger bonus fulfillment.
5. A duplicate request must not cause duplicate deductions.
6. A duplicate event must not cause duplicate bonus fulfillment.
7. Notification retries must not repeat financial operations.
8. Every redemption must have a traceable transaction history.

## 6. Transaction States

The exact state model must be approved before implementation.

Proposed states:

- PENDING
- CHECKING_ELIGIBILITY
- REJECTED
- DEDUCTING_POINTS
- POINTS_DEDUCTED
- FULFILLING_BONUS
- COMPLETED
- FAILED
- COMPENSATION_PENDING
- COMPENSATED

Do not implement these proposed states without checking the existing
state model and agreeing on the required transitions.

## 7. Failure Scenarios

Document the expected behavior for:

- Invalid customer.
- Ineligible redemption.
- Insufficient points.
- Database unavailable.
- Kafka temporarily unavailable.
- Duplicate message delivery.
- Point deduction succeeds but acknowledgment is lost.
- Bonus fulfillment fails after points have been deducted.
- Notification provider is unavailable.
- A worker crashes during processing.

## 8. Acceptance Criteria

- An eligible customer can redeem an available reward.
- An ineligible customer cannot redeem the reward.
- Points are deducted only after eligibility succeeds.
- Bonus fulfillment occurs only after successful point deduction.
- Duplicate processing does not produce duplicate business effects.
- The final transaction state reflects the actual business outcome.
- Failure scenarios are covered by automated tests.

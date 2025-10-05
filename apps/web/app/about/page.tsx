import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faHeart, faUsers, faShieldCheck } from '@fortawesome/pro-solid-svg-icons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'About | TFC Calculator',
  description: 'Learn about TFC Calculator - helping UK families understand and maximize their Tax-Free Childcare benefits.',
};

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FontAwesomeIcon icon={faCalculator} size="2x" className="text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-balance font-public-sans">
            About TFC Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-source-sans">
            We're here to help UK families understand and maximize their Tax-Free Childcare benefits
            with clear, accurate calculations and expert guidance.
          </p>
        </div>

        {/* Mission */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FontAwesomeIcon icon={faHeart} className="text-blue-600 dark:text-blue-400" size="lg" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold font-public-sans">Our Mission</h2>
                <p className="text-muted-foreground font-source-sans">
                  Tax-Free Childcare can save families thousands of pounds each year, but understanding
                  quarterly limits, contribution rates, and eligibility can be confusing. We created TFC Calculator
                  to make these calculations simple, accurate, and accessible for every UK family.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalculator} className="text-primary" />
                  <h3 className="font-semibold font-public-sans">Accurate Calculations</h3>
                </div>
                <p className="text-sm text-muted-foreground font-source-sans">
                  Our calculator uses the latest government rates and rules to provide precise
                  calculations for your Tax-Free Childcare contributions and quarterly limits.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faShieldCheck} className="text-green-600" />
                  <h3 className="font-semibold font-public-sans">Privacy First</h3>
                </div>
                <p className="text-sm text-muted-foreground font-source-sans">
                  All calculations happen in your browser. We don't store your personal information
                  or childcare data. Your privacy is our priority.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUsers} className="text-purple-600" />
                  <h3 className="font-semibold font-public-sans">Family Focused</h3>
                </div>
                <p className="text-sm text-muted-foreground font-source-sans">
                  Built by parents for parents. We understand the complexities of childcare costs
                  and the importance of every pound saved.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalculator} className="text-orange-600" />
                  <h3 className="font-semibold font-public-sans">Always Free</h3>
                </div>
                <p className="text-sm text-muted-foreground font-source-sans">
                  TFC Calculator will always be free for UK families. No hidden costs,
                  no premium features, just helpful tools for everyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tax-Free Childcare Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold font-public-sans">Understanding Tax-Free Childcare</h2>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground font-source-sans">
                  Tax-Free Childcare is a UK government scheme that helps working families with childcare costs.
                  For every £8 you pay into your account, the government adds £2 (a 20% contribution).
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    20% government contribution
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    £500 quarterly limit per child
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    £1,000 for disabled children
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    3-month cycles
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="font-semibold font-public-sans text-yellow-800 dark:text-yellow-200">
                Important Notice
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-200 font-source-sans">
                This calculator is for guidance only and is not affiliated with HMRC or the UK government.
                Always check with HMRC for official information about Tax-Free Childcare eligibility and contributions.
                Visit{' '}
                <a
                  href="https://www.gov.uk/tax-free-childcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  gov.uk/tax-free-childcare
                </a>{' '}
                for official guidance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
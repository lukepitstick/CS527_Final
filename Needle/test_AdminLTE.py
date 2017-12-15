from needle.cases import NeedleTestCase
from selenium import webdriver

driver = webdriver.Chrome('./chromedriver')

class AdminLTETest(NeedleTestCase):
    viewport_width = 1024
    viewport_height = 768

    # @classmethod
    # def get_web_driver(cls):
    #     return NeedlePhantomJS()

    def test_fullscreenmasthead(self):
        self.driver.get('http://localhost:8080')
        # self.driver.get('http://localhost/AdminLTE-master/index.html')
        self.assertScreenshot('*', 'fullscreen')
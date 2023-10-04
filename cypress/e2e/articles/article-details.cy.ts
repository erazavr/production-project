let currentArticleId = '';
describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then(article => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it('Видит содержимое статьи', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });
  it('Видит список рекоммендаций', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });
  it('Отправляет комментарий', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('test text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });
  it('Ставит оценку', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});

export {};
